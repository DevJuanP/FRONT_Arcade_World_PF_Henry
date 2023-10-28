import React, { useState } from 'react'
import './upload.css'
const UploadImage = ({image, setImage}) => {

    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) =>{
        const files = e.target.files;
        const data = new FormData()

        data.append('file', files[0]);
        data.append('upload_preset', 'JesusBavaresco'); // el segundo campo varia dependiendo del nombre que utilices
        setLoading(true)

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/du9kziyei/image/upload', // el url varia por cada usuario 'https://api.cloudinary.com/v1_1/tuUsuario/image/upload'
            {
                method: "POST",
                body: data,
            }
        )
        const file = await res.json();
        setImage(file.secure_url)
        setLoading(false)
    }
    return ( 
        <div>
            <input 
                className='file-select'
                id="exampleFile"
                name="file"
                type="file"
                onChange={uploadImage}
                />
        </div>
     );
}
 
export default UploadImage;