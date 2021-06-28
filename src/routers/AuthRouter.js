import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

  //La diferencia entre con el AppRouter es que este no tiene router solamente tiene las rutas y el navbar
export const AuthRouter = () => {
    return (
        
        <div className = "auth__main">
            <div className = "auth__box-container">
                <Switch>
                    <Route  exact path="/auth/login" component = {LoginScreen}/>                    
                    <Route  exact path="/auth/register" component = {RegisterScreen}/>
                    

                    <Redirect to = "/auth/login"/>                                        
                </Switch>
            </div>
        </div>
    )
}