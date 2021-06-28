import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useForm} from '../../hooks/useForm';
import validator from 'validator';
import { startGoogleLogin, startLoginEmailPassword} from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    const {msgError, loading} = useSelector( state => state.ui );
    //const {loading} = useSelector( state => state.auth );

    //Este hook de dispatch fue creado a partir de un snipped que compartió el profesor
    const dispatch = useDispatch();

    //useForm
    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const {email, password} = formValues;

    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()){
            /* Desde actions/auth */
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isFormValid = () => {
        if ((email.trim().length || password.trim().length) <= 5){
            dispatch(setError("Fill all required fields"));
            return false;
        }
        
        if (!validator.isEmail(email)){
            dispatch(setError("Invalid Email"));
            return false;
        }

        if (password.trim().length < 6 ){
            dispatch(setError("Password should have at least 6 caharacters"));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className= "auth__title">Login</h3>
            <form onSubmit= {handleSubmit} className="animate__animated animate__fadeIn animate__faster">
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className= "auth__input"
                    autoComplete = "off"
                    value = {email}
                    onChange = {handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className= "auth__input"
                    value = {password}
                    onChange = {handleInputChange}
                />
                
                {
                    msgError &&
                        <div className = "auth__alert-error">{msgError}</div>
                }
                <button
                    type="submit"
                    className = "btn btn-primary btn-block"
                    disabled = {loading}
                >
                    Login
                </button>
  

                <div className = "auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to = "/auth/register"
                    className = "link"
                >
                    Create new account
                </Link>
                
            </form>
        </>
    )
}
