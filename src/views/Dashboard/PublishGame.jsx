
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { gameGenres, gamePlataforms, createVideogame } from '../../../src/redux/actions.js';
import "./PublishGameStyle.css";


const PublishGame = () => {

  const dispatch = useDispatch() 
  const platforms = useSelector(state => state.platforms)
  const genres = useSelector(state => state.genres)
  const allVG = useSelector( state => state.games )
  const allnames = allVG.map( vg => vg.name)
  const currentDate = new Date();
  
  const [state, setState] = useState({
    name: '',
    description: '',
    image: '',
    released: '',
    price: 0,
    isActive: false,
    genres: [],
    platforms:[]
  })
  
  const [errors, setErrors] = useState({
    name: 'required field* ',
    description: 'required field* ',
    image: '',
    released: 'required field* ',
    price: 'required field* ',
    genres: 'required field* ',
    platforms:'required field* '
  })

  useEffect(() => {
    
    dispatch(gameGenres());
    dispatch(gamePlataforms());
  
    return () => {
      
      
    };
  },[])
  
  const validate = (state, name) => {
    switch(name){
      case `name`:
        if(state.name === "") setErrors({...errors, name: 'required field*'})
        else if(state.name.length<4 || state.name.length>20) setErrors({...errors, name: 'The name must be between 3 and 20 characters long'})
        else if(!/^[a-zA-Z0-9\-": ]+$/.test(state.name)) setErrors({...errors, name: 'Only use alphanumeric symbols, "", - and :'})
        else if(allnames.includes(state.name)) setErrors({...errors, name: 'This name already exists'})
        else setErrors({...errors, name: ''}); break
      
      case `description`:
        if(state.description === "") setErrors({...errors, description: 'required field*'})
        else if(state.description.length<16 || state.description.length>300) setErrors({...errors, description: 'The description must be between 15 and 300 characters'})
        else if(!/^[a-zA-Z0-9\-": ]+$/.test(state.description)) setErrors({...errors, description: 'Only use alphanumeric symbols, "", - and :'})
        else setErrors({...errors, description: ''}); break

      /*case 'image':
        if(state.image === "") setErrors({...errors, image: 'campo requerido*'})
        else if(!/^(https?|ftp):\/\/\S+$/.test(state.image)) setErrors({...errors, image: 'La URL de la imagen no es válida.'})
        else setErrors({...errors, image: ''}); break*/

      case `released`:
        if(state.released === "") setErrors({...errors, released: 'required field*'})
        else if(!/^\d{4}-\d{2}-\d{2}$/.test(state.released)) setErrors({...errors, released: 'The date format must be yyyy-mm-dd'})
        else if((new Date(state.released))> currentDate) setErrors({...errors, released: 'No future dates allowed.'})
        else setErrors({...errors, released: ''}); break

      case `price`:
        if(state.price === "") setErrors({...errors, price: 'required field*'})
        else setErrors({...errors, price: ''}); break

      case 'genres':
        state.genres.length === 0
          ? setErrors({
              ...errors,
              genres: 'required field* ',
            })
          : setErrors({
              ...errors,
              genres: '',
            });
        break;
  
      case 'platforms':
        state.platforms.length === 0
          ? setErrors({
              ...errors,
              platforms: 'required field* ',
            })
          : setErrors({
              ...errors,
              platforms: '',
            });
        break;
      default:
        break;
    }
  }

  const handleInputChange = (event) =>{
    switch(event.target.name){
      case 'platformIds':
        let pValue = document.getElementById('platformIds').value
        if(state.platforms.includes(pValue)) break;//votar error
        setState({
          ...state,
          platforms: [...state.platforms, pValue]
        })
        validate({
          ...state,
          platforms: [...state.platforms, pValue]
        },'platforms')
        break;
      
      case 'genreIds':
        let gValue = document.getElementById('genreIds').value
        if(state.genres.includes(gValue)) break;//votar error
        setState({
          ...state,
          genres: [...state.genres, gValue]
        })
        validate({
          ...state,
          genres: [...state.genres, gValue]
        },'genres')
        break;

      case 'isActive':
        const isActive = document.getElementById('isActive')
        
        setState({
          ...state,
          isActive: isActive.checked
        })
        
        break;

      /*case 'image':
        claudinary*/
      case 'price':
        setState({ 
          ...state,
          price: event.target.value
        })
        validate({ 
          ...state,
          price: event.target.value
        }, 'price')
        break;

      default:
        setState({ 
          ...state,
          [event.target.name]: event.target.value
        })
        validate({ 
          ...state,
          [event.target.name]: event.target.value
        }, event.target.name)
    }

  }

  const handleRemove = (event) => {
    setState({
      ...state,
      platforms: [...state.platforms].filter(p => p !== event.target.id),
      genres: [...state.genres].filter(g => g !== event.target.id)
    })
    validate({
      ...state,
      platforms: [...state.platforms].filter(p => p !== event.target.id),
      genres: [...state.genres].filter(g => g !== event.target.id)
    }, event.target.name)
  }

  const disableHandler = () => {
    let totalError = '';
    for(let i in errors){
      totalError += errors[i]
    }
    return totalError.length? true: false
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('hola');
    dispatch(createVideogame({
      ...state,
      genres: state.genres.map( g => genres.indexOf(g)+1),
      platforms: state.platforms.map( p => platforms.indexOf(p)+1)
    })).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully created",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          content: 'small-font'
        },
      });
     });
    setState({
      name: '',
    description: '',
    image: '',
    released: '',
    price: 0,
    isActive: false,
    genres: [],
    platforms:[]
    })
  }
  const BoxMain={
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    backgroundColor:'#546e7a'
 }

  return (
  <div  style={BoxMain}>
    <div className="FormCard">
    
    <div className='createcontainer'>
      <h2>Create a new videogame</h2>
    <form
        className='createform'
        onSubmit={handleSubmit}
      >
        <div className='group'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>
        <div className='group'>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={state.description}
            onChange={handleInputChange}
            required
          ></textarea>
          {errors.description && (
            <p className='error'>{errors.description}</p>
          )}
        </div>
        <div className='group'>
          <label htmlFor="image">Imagen:</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            value={state.image}
          />
        </div>
        <div className='group'>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={state.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className='error'>{errors.price}</p>}
        </div>
        <div className='group'>
          <label htmlFor="released">Released:</label>
          <input
            type="date"
            id="released"
            name="released"
            value={state.released}
            onChange={handleInputChange}
          />
          {errors.released && (
            <p className='error'>{errors.released}</p>
          )}
          
        </div>
        <div className='group'>
          <label htmlFor="isActive">Active:</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={state.isActive}
            onChange={handleInputChange}
          />
        </div>

        <div className='group'>
          <label htmlFor="genreIds">Select genres:</label>
          <div>
              <select
                id="genreIds"
                name="genreIds"
                onChange={handleInputChange}
                defaultValue='default'
              >
                <option disabled value="default">Genres</option>
                {genres?.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <div className='contentSelecPlatfGn'>
                    {state.genres.map((selectedId)=>{
                      
                      return (
                          <div key={selectedId} className='selectedTemp'>
                              <button type="button" name="genres" id={selectedId} onClick={handleRemove}>
                              {selectedId}
                              </button>
                          </div>)
                          })}
               </div>
          </div>
              {errors.genres && (
            <p className='error'>{errors.genres}</p>
          )} 
        </div>
        <div className='group'>
          <label htmlFor="platformIds">Select platforms:</label>
          <div >
              <select
                id="platformIds"
                name="platformIds"
                onChange={handleInputChange}
                defaultValue='default'
              >
                <option disabled value="default">Platforms</option>
                {platforms?.map((platf) => (
                  <option key={platf} value={platf}>
                    {platf}
                  </option>
                ))}
              </select>
             <div className='contentSelecPlatfGn'>
                 {state.platforms.map((selectedId)=>{
                   
                   return (
                       <div key={selectedId} className='selectedTemp'>
                         <button type="button" name="platforms" id={selectedId} onClick={handleRemove}>
                           {selectedId}
                          </button>
                       </div>)
                       })}
        {errors.platforms && (
            <p className='error'>{errors.platforms}</p>
          )} 
              </div> 
          </div>
        </div>
       
          <div className='group'>
          <button type="submit" >Create videogame</button>
        </div>
      </form>
    </div>
    <div>
      caja de auto creacion de la carta  
    </div>
    </div>
  </div>
  );
};
export default PublishGame