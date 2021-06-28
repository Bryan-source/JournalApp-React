import Swal from 'sweetalert2';

import { googleAuthProvider, firebase } from "../firebase/firebase-config";
import { types } from "../types/types"
import { noteLogout } from './notes';

//Login de usuario registrado
export const startLoginEmailPassword = (email, password) => {
    //Callback
    return (dispatch) => {
        //Pone el loading en true cuando se cumpla la petición tomará como valor false, sirve para desabilitar el botón y este no pueda ser accionado mas de una vez mientras se cumple el proceso de login.
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {

            //Pone el loading en false 
            dispatch(finishLoading());
            dispatch(
                login(user.uid, user.displayName)
            )
        })
        .catch (e => {
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        })
    }
}

//Registro de usuario en la plataforma
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        /* createUserWithEmailAndPassword propiedad de firebase para registrarse con email y password */
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async({user}) => {

            /* updateprofile se utiliza debido a que al no crear la cuenta con una red social el displayName da como resultado null, espor eso que esta propieda sirve para definir el displayname y así obtener el nombre del usuario */
            await user.updateProfile({displayName: name});
            console.log(user);

            //Después de crear la cuenta, automaticamente hace login con esta instrucción.
            dispatch(
                login(user.uid, user.displayName)
            );
        })
        .catch (e => {
            console.log(e);
            Swal.fire('Error', e.message, 'error');
        })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        /* signInWithPopup propiedad de firebase para hacer login con una cuenta de red social externa */
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(({user}) => {
            dispatch(
                login(user.uid, user.displayName)
            )
        });
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());

        //Sirve para eliminar las notas que se quedaron grabadas en el store de redux al hacer noteLogout
        /* Relación con : notes.js */
        dispatch(noteLogout());
    }
}


//Action login
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

//Action logout
export const logout = () => ({
    type: types.logout
})

//Action Start & Finish loading
const startLoading = () => ({
    type: types.uiStartLoading
    
})
const finishLoading = () => ({
    type: types.uiFinishLoading
})