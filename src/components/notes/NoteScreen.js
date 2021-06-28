import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    //active:note significa que se está renombrando active por note
    const {active:note} = useSelector( state => state.notes );
    const [formValues, handleInputChange, reset] = useForm(note);

    //id se utiliza para borrar la nota actualemte mostrada y que se encuentra en el active
    const {id, body, title, url} = formValues;
    //El useRef mantiene una referencia mutable es decir algo que va a cambiar con el tiempo, en este caso el id de la nota está cambiando frecuentemente al selecionar diferentes cards, useRef evita que se produzca algún error
    const activeId = useRef(note.id);

    //Este useEffect actúa para que en tiempo real se actualicen los campos del useForm para que al ir seleccionando cada card nos muestre la información respectiva conforme se seleccione en tiempo real
    useEffect(() => {
        
        //Este useEffect sólo se ejecuta si y sólo si la note.id es diferente de la referencia que apunta el useRef de este modo se evita un ciclo infinito en la aplicación.
        if (note.id !== activeId.current){
            reset(note);
            activeId.current = note.id 
       }
    }, [note, reset])

    //EDITAR CAMPOS
    //Este useEffect actualiza en tiempo real cualquier texto que se escriba en los campos por eso su dependencia es formvalues
    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}));
    }, [formValues, dispatch])
    
    const handleDelete = () => {
        dispatch(startDeleting(id))
    }
    return (
        <div className="notes__main-content">
            <NotesAppBar/>

            <div className="notes__content">
                <input
                    name="title"
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value = {title}
                    onChange = {handleInputChange}
                />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value = {body}
                    onChange = {handleInputChange}
                >
                </textarea>

                {
                    //Si url existe entonces muestra esta sección. url viene de url.note
                    url && 
                        (<div className="notes__image">
                            <img 
                                src={url}
                                alt="imagen"
                            />
                        </div>)
                }
                
            </div>
            <div
                className= "btn btn-danger"
                onClick = {handleDelete}    
            >
                Delete
            </div>
        </div>
    )
}
