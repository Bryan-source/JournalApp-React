import { db } from "../firebase/firebase-config";

/* Esta función es creada para obtener la información de las notas creadas por el usuario desde el database en firebase */
export const loadNotes = async(uid) => {

    /* get() obtiene toda la información almacenada en notes */
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    notesSnap.forEach(snapChildren => {
        notes.push({
            id: snapChildren.id, 
            ...snapChildren.data()
        })
    });
    console.log(notes);
    return notes;
}