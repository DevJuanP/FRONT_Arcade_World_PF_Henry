
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { gameGenres, gamePlataforms, createVideogame } from '../../../src/redux/actions.js';

const validate=(initialValues) => {
  const errors = {};
  const lettersOrSpacesREGEX = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const numberREGEX = /^([0-9]+(?:\.[0-9]*)?)$/;

  if (initialValues.genreIds.length === 0) {
    errors.genreIds = "Please insert videogame genre.";
  } else if (initialValues.genreIds.length > 6) {
    errors.genreIds = "You cannot select more than 6 types of genreIds";
  }
  
  if (initialValues.platformIds.length === 0) {
  errors.platformIds = "Please insert videogame platform.";
  } else if (initialValues.platformIds.length > 6){
    errors.platformIds = "You cannot select more than 6 types of platformIds";
  }
if (!initialValues.name) {
    errors.name = "Please insert videogame name.";
}
if (
    !lettersOrSpacesREGEX.test(initialValues.name) &&
    initialValues.name
) {
    errors.name ='Name is not valid';
}
if (!initialValues.description) {
  errors.description ="Please insert videogame description.";
}
if (initialValues.description.length > 200) {
  errors.description ="Description should be less than 200 characters.";
  }
if (!initialValues.price) {
    errors.price = "Please insert videogame price.";
}
if (initialValues.price && !numberREGEX.test(initialValues.price)) {
    errors.price = "Just numbers.";
}
if (!initialValues.released) {
  errors.released = "Please insert videogame released.";
}


  return errors;
}

import styles from "./PublishGame.module.css";


const PublishGame = () => {
  const genresList = useSelector((state) => state.genres);
  const platformsList = useSelector((state) => state.platforms);

  const [previewImage, setPreviewImage] = useState("");  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    released: "",
    isActive: false,
    genreIds: [],
    platformIds: [],
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameGenres());
    dispatch(gamePlataforms());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleRemoveImage = () => {
    const fileInput = document.getElementById("image");
    fileInput.value = "";
    setPreviewImage("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData)=> ({...prevFormData, [name]: value}));
    const validateErr = validate({...formData, [name]: value })
    setErrors(validateErr);
  };

  const handlerSelecGenres =(event)=> {
    const selectedId = event.target.value;
    if (!formData.genreIds.includes(selectedId)) {
        setFormData((prevFormData) => ({ ...prevFormData, genreIds: [...prevFormData.genreIds, selectedId] }));
    }
  };
  const handlerSelecPlatform =(event)=> {
    const selectedId = event.target.value;
    if (!formData.platformIds.includes(selectedId)) {
        setFormData((prevFormData) => ({ ...prevFormData, platformIds: [...prevFormData.platformIds, selectedId] }));
    }
  };
   
  const handlerDeletGenre = (id)=> {
    setFormData((prevFormData) => ({
      ...prevFormData,
      genreIds: prevFormData.genreIds.filter((g) => g !== id)
    }));
    
  }
  const handlerDeletPlatf = (id)=> {
    setFormData((prevFormData) => ({
      ...prevFormData,
      platformIds: prevFormData.platformIds.filter((p) => p !== id)
    }));
    
  }
  const handleDropdownToggleG = () => {
     document.getElementById('genreIds');
  }; 
  const handleDropdownToggleP = () => {
    document.getElementById('platformIds');
  }; 
 
  const handleSubmit = (event) => {
    event.preventDefault();
    
    let aux = Object.keys(errors);
    if (aux.length === 0) { 
           
      const productData = {
        name: formData.name ,
        description: formData.description,
        image: formData.image || "",
        price: formData.price || 0,
        released: formData.released || "",
        isActive: formData.isActive || false,
        genreIds: formData.genreIds || [],
        platformIds: formData.platformIds || [],
      }      
       dispatch(createVideogame(productData)).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Succesfully created",
          showConfirmButton: false,
          timer: 1500,
        });
      });
        
        setFormData({
        name: "",
        description: "",
        image: "",
        price: "",
        released: "",
        isActive: false,
        genreIds: [],
        platformIds: [],
        });
        setErrors(validate(productData));
        setPreviewImage("");
    } else {
      alert('Please fix validation errors before submitting');
    }
     
   }
  

  return (
    
    <div className={styles.createcontainer}>
      <h2>Create a new videogame</h2>
      <form
        className={styles.createform}
        onSubmit={handleSubmit}
        
      >
        <div className={styles.group}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.group}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
        </div>
        <div className={styles.group}>
          <label htmlFor="image">Imagen:</label>
          <input
            className={styles.selectimg}
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <label  htmlFor="image">
            <span className={styles.uploadButton}>Select file</span>
          </label>
          {previewImage && (
            <img
              className={styles.image}
              id="preview"
              src={previewImage}
              alt="Preview"
            />
          )}
          <button
            className={styles.buttonDelete}
            type="button"
            onClick={handleRemoveImage}
          >
            Delete image
          </button>
        </div>
       
        <div className={styles.group}>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            
          />
          {errors.price && <p className={styles.error}>{errors.price}</p>}
        </div>
        
        <div className={styles.group}>
          <label htmlFor="released">Released:</label>
          <input
            type="date"
            id="released"
            name="released"
            value={formData.released}
            onChange={handleInputChange}
          />
          {errors.released && (
            <p className={styles.error}>{errors.released}</p>
          )}
          
        </div>
          <div className={styles.group}>
          <label htmlFor="isActive">Active:</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={() =>
              setFormData({ ...formData, isActive: !formData.isActive })
            }
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="genreIds">Select genres:</label>
          <div onClick={handleDropdownToggleG}>
              <select
                id="genreIds"
                name="genreIds"
                onChange={handlerSelecGenres}
                defaultValue='default'
              >
                <option disabled value="default">Genres</option>
                {genresList?.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <div className={styles.contentSelecPlatfGn}>
                    {formData.genreIds.map((selectedId)=>{
                      
                      return (
                          <div key={selectedId} className={styles.selectedTemp}>
                              {selectedId}
                              <button type="button" onClick={() => handlerDeletGenre(selectedId)}>
                                  ✖
                              </button>
                          </div>)
                          })}
               </div>
          </div>
              {errors.genreIds && (
            <p className={styles.error}>{errors.genreIds}</p>
          )} 
        </div>
        <div className={styles.group}>
          <label htmlFor="genreIds">Select platforms:</label>
          <div onClick={handleDropdownToggleP}>
              <select
                id="platformIds"
                name="platformIds"
                onChange={handlerSelecPlatform}
                defaultValue='default'
              >
                <option disabled value="default">Platforms</option>
                {platformsList?.map((platf) => (
                  <option key={platf} value={platf}>
                    {platf}
                  </option>
                ))}
              </select>
             <div className={styles.contentSelecPlatfGn}>
                 {formData.platformIds.map((selectedId)=>{
                   
                   return (
                       <div key={selectedId} className={styles.selectedTemp}>
                           {selectedId}
                           <button type="button" onClick={() => handlerDeletPlatf(selectedId)}>
                               ✖
                           </button>
                       </div>)
                       })}
        {errors.platformIds && (
            <p className={styles.error}>{errors.platformIds}</p>
          )} 
              </div> 
          </div>
        </div>
       
          <div className={styles.group}>
          <button type="submit">Create videogame</button>
        </div>
      </form>
    </div>
  );
};
export default PublishGame









