import { types } from "../types/types";

/* 
    active: null
    notes: []

*/
const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                /* podría ser active: ...action.payload pero también se puede escribir de esta forma la sintáxis */
                active: {
                    /* obtiene todos los elementos dentro del payload */
                    ...action.payload
                }
            }
    
        /*Al crear una note, que esta aparezca automáticamente en la sección de minicards al guardar y no tener que recargar la página.  */
        case types.notesAddNew:
            return {
                ...state,
                /* crea la minicard de la nota con action.payload y después vuelve a imprimir todas las minicards de notas que ya estaban con ...state.notes ubicando la nueva nota al inicio  */
                notes: [action.payload, ...state.notes]
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        
        //Va a actualizar la información de las notas pequeñas del panel lateral
        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note /* Este note no tiene que ver con el callback note del map si no del note de la action de notes.js */
                        : note //de otro modo será la misma nota
                )
            }

        //Elimina nota por nota
        case types.notesDelete:
            return {
                ...state,
                active: null,
                // Filtra todas las notas que sean diferentes al id de la nota que se eligió para eliminarse
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        //Purga notas al hacer Logout (las quita del store)
        case types.notesLogoutCleaning:
            return {
                /* Esta es una forma de hacerlo */ 
                //state: initialState

                ...state, //Por si acaso no queremos perder algo
                active: null,
                notes: []
            }

        default:
            return state;
    }
}