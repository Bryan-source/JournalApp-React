import Swal from 'sweetalert2'

import {db} from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

/*cloudinary -> react-journal */

export const startNewNote = () => {
    /* getState es un callback que funciona como useSelector ya que toma la propiedades del redux para usarlos en el código*/
    return async(dispatch, getState) => {
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        /* doc crea una colleccion nueva en la base de datos del firebase en el cual su dirección es id/journal/notes
        si id/journal/notes no existe doc se encarga de crearla por primera vez desde esta instrucción */
        /* siempre se requiere el uid porque es una clave única del usuario por eso la obtuvimos con getState */
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewNote(doc.id, newNote));
    }
}

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

/* Al crear una note, que esta aparezca automáticamente en la sección de minicards al guardar y no tener que recargar la página. */
export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

/* Accion distinta */
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes 
});

//Recibe como argumento la note que se editó
export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;

        //Si url es null entonces lo elimina en el firestore.
        if(!note.url){
            delete note.url;
        }

        /* delete para eliminar el id ya que este no está en la sección de note sólo es parte de la ubicación no se necesita porque ya se sabe a quien pertenece esa nota */
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        //Va hasta la dirección de mis notas en el firebase y lo actualiza
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
    }
}

//Actualiza la nueva nota de la mini card en el panel lateral
export const refreshNote = (id, note) => ({
    type: types.notesUpdated,

    /* es para que la note se le sea asignado el id ya que como simple note sin {id, ...note} no le asigna uno y marca error */
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {
    return async(dispatch, getState) => {

        //getState toma del redux notes / active y active reemplaza el nombre por activeNote
        //Toma la nota activa
        const {active:activeNote} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            //antes de terminar va a mostrar un loading
            didOpen: () => {
                Swal.showLoading();
            }
        });

        //helpers/fileUpload: devuelve el secureUrl el cual se puede ver desde PostMan
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        
        dispatch(startSaveNote(activeNote));

        Swal.close();
    }
}

//Eliminar nota
export const startDeleting = (id) => {
    return async(dispatch , getState) => {
        const {uid} = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
    }    
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


//Purgar notas al hacer Logout
export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})

