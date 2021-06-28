import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {
    const {active} = useSelector( state => state.notes );
    return (
        <div className = "journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar/>
            <main>
                {
                    /* Determina si el active no es null, si no está vacío, cuando tenga elementos entonces se va a mostrar la pantalla de crear notas.
                    */
                    (active)
                        ? <NoteScreen/>
                        : <NothingSelected/>
                }
            </main>
        </div>
    )
}
