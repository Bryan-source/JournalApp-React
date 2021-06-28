import React from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';
//Component es el componente que se quiere renderizar como por ejemplo el de login el navbar etc
/* ...rest se refiere al resto de los elementos y va a ser llamado como ...props en el componente*/

/* Sintaxis de el nombre component debe ser con C mayuscula en caso de no referirnos a la etiqueta html <component>  */

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    /* En los argumentos este ...rest no funciona como spread */
    /* El path ='/' es parte de este rest  */
    ...rest
}) => {
    
    return (
        <Route {...rest}
            /* La arrow function es con parentesis porque retorna algo */
            /* props es un callback que hace referencia a los props del componente que son el history location etc */
            component = {(props) => (
                (isAuthenticated)
                    /* Aquí ...props funciona como spread */
                    ? (<Component {...props}/>)
                    :(<Redirect to='/auth/login'/>)
            )}/>
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}