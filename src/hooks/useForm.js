import {useState} from 'react';

export const useForm = (initializeForm = {}) => {
    
    const [formState, setFormState] = useState(initializeForm);

    //En este punto  reset recibe un parámetro que si no existe por default lo iguala al initializeForm, pero si existe, nos permite hacer reset y que los campos del form se llenen con un texto deseado y no vacío.
    const reset = (newFormState = initializeForm) => {
        setFormState(newFormState);
    }
    
    //Este método usa e.target pero aquí desestrucramos el target para sólo usar target.elemento
    //El target hace referencia al input 
    const handleInputChange = ({target}) => {

        
        //Hacemos que el value del input se almacene en su respectivo objeto tomando como referencia la propiedad de name = '' del input.
        setFormState({
            ...formState,
            [target.name]: target.value
        });
    }
    
    return [formState, handleInputChange, reset];
}