import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,  //Antes era BrowserRouter pero para evitar el error 404 al recargar la página en netliify se cambió el nombre a este.
    Switch,
    Redirect
} from 'react-router-dom';
import {firebase} from '../firebase/firebase-config';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    //State que determina si aparece una pantalla de carga cuando se recargue la página o cuando se esté haciendo loggin
    const [checking, setChecking] = useState(true);
    //Determina si está logueado o no 
    const [isLoggedin, setIsLoggedin] = useState(false);

    const dispatch = useDispatch();
    

/* Este useEffect se utiliza prácticamente para impedir que nuestro estado de autenticación se borre del auth que creamos con Redux, esto no pasa con firebase ya que conoce bien que el usuario ya se atenticó  */
    useEffect(() => {
        //El useEffect en sus dependencias  ignorar el dispatch ya que ese no influye en el effect
        
        /* Con esta instrución del firebase se van a capturar los datos de autenticación y se van a mantener incluso si el usuario refresca la página, también se actualiza si cambió de cuenta para autenticarse
        
        ya que onAuthStateChanged maneja un tipo de objeto especial llamado observable que se dispara cada que existe algun cambio de actualización en la página.
        */
        firebase.auth().onAuthStateChanged((user) => {
            /* if el objeto user no es null (contiene algo) entonces pregunta si existe el uid */
            if (user?.uid) {
                dispatch( login(user.uid, user.displayName));
                /*Obtiene la info de las notas del user y la almaena en un arreglo llamado notes */
                dispatch(startLoadingNotes(user.uid))
                setIsLoggedin(true);
            }else {
                setIsLoggedin(false);
            }

            //Cuando ya se hizo autenticación entonces deja de mostrar la carga
            setChecking(false);
        });

        //Actualmente este dispatch no cambia pero react nos pide para evitar errores o warnings
    }, [dispatch, setChecking, setIsLoggedin])

    if (checking){
        return (
            <h1>Cargando...</h1>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        component = {AuthRouter}
                        isAuthenticated = {isLoggedin}
                    />
                        
                    {/* El path es parte del ...rest de PrivateRoute */}
                    {/* En el localStorage guarda el pathname del rest de la respectiva ruta del DashBoard */}
                    <PrivateRoute
                         
                        path="/" 
                        component = {JournalScreen}
                        isAuthenticated = {isLoggedin}   
                    />

                    <Redirect to = "/auth/login"/>                                    
                </Switch>
            </div>
        </Router>
    )
}