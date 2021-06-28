import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    //useSelector
    /* A partir de un callback llamado state hace referencia al state de redux del navegador, en este caso se requiere el ui y se desestructura para obtener directamente msgError */
    const {msgError} = useSelector( state => state.ui );

    //useForm
    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formValues;

    //useDispatch
    const dispatch = useDispatch();

    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name));            
        }
        
    }

    //FormValid
    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch(setError('Name required'));
            return false;
        }
        if (!validator.isEmail(email)){
            dispatch(setError("Invalid Email"));
            return false;
        }

        if (password.trim().length < 6 ){
            console.log("Password should have at least 6 caharacters");
            dispatch(setError("Password should have at least 6 caharacters"));
            return false;
        }

        if (password2.trim() !== password.trim()){
            console.log("password doesn't match");
            dispatch(setError("Password doesn't match"));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
            <h3 className= "auth__title">Register</h3>
            <form onSubmit = {handleSubmit} className="animate__animated animate__fadeIn animate__faster">

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className= "auth__input"
                    autoComplete = "off"
                    value = {name}
                    onChange = {handleInputChange}
                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className= "auth__input"
                    value = {password2}
                    onChange = {handleInputChange}
                />

                {/* Caja de error */}
                {
                    /* Si error no es null entonces.. */
                    msgError && 
                        <div className = "auth__alert-error">{msgError}</div>
                    
                }
                

                <button
                    type="submit"
                    className = "btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
  

                <Link
                    to = "/auth/login"
                    className = "link"
                >
                    Already registered?
                </Link>
                
            </form>
        </>
    )
}
