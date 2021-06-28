import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {
    
    const dispatch = useDispatch();
    const {active} = useSelector( state => state.notes );
    const handleSave = () => {
        
        dispatch(startSaveNote(active))
    }

    //Button Picture 
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    //input type: file al seleccionar una imagen de mi directorio el target hace referencia al que haya elegido con el click
    const handleFileChange = (e) => {        
        
        const file = e.target.files[0];
        if(file) {
            //Sube el archivo seleccionado a cloudinary
            dispatch(startUploading(file));

            //Sirve para que se reinicie el input file y me permita subir la misma imagen en otra card, si este no se reinicia entonces no podría hacerlo tendría que elegir otra imagen
            //El value hace referencia a la imagen actual seleccionada.
            document.querySelector('#fileSelector').value = '';
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto de 2020</span>

            <div>
                {/* Este input está escondido a partir del handlePictureClick el botón Picture lo llama y se comporta como un inpit tipo file */}
                <input
                    id = "fileSelector"
                    name = "file" 
                    type="file"
                    style = {{display:'none'}}
                    onChange = {handleFileChange}
                />
                <button 
                    className="btn"
                    onClick = {handlePictureClick}
                    >
                    Picture
                </button>
                
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
                
            </div>
        </div>
    )
}
