/* Archivos referenciados
    actions/notes.js startUploading
*/

export const fileUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/djz1ou8km/upload';

    //Datos del formData desde Postman para traer la imagen desde claudinary
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            //Parametros desde el PostMan
            method: 'POST',
            body: formData
        });

        if (resp.ok) {

            const cloudResp = await resp.json();
            //Retorna el url seguro de la imagen que se subió este url se utiliza para que se muestre la imagen en la nota
            return cloudResp.secure_url;
        } else {
            /* Muestra un error de cloudinary */
            throw await resp.json();
        }
    } catch (err) {
        throw err;
    }


}

