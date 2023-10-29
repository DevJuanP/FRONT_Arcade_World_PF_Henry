
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { gameById } from '../../redux/actions.js';
import style from './details.module.css'

const Details = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const gameId = useSelector((state)=> state.gameId);
    
    useEffect(()=>{
        dispatch(gameById(id))
    },[id, dispatch])

    return(
    

    <div className={style.contentBtn}>
          <Link to='/home'>
           <button>Return to Home</button>
          </Link>
        
        <div >
        {gameId.map((gm)=> (
            <div key={gm.id}>
                <div>
                 <img src={gm.image} alt={gm.name} />
                 <h2 className={style.name}>Name: {gm.name}</h2>
                </div>
              <div>
                <h3>Price: ${gm.price}</h3>
                <h4>Genres: {gm.genres}</h4>
                <h4>Platforms: {gm.platforms}</h4>
                <p>About the game: {gm.description}</p>
                <h4>Released: {gm.released}</h4>
              </div>   

            </div>
        ))

        }
         </div>
         <div className={style.buttons}>
           <button>Add</button>
           <button>Buy</button>
         </div>
    </div>
         
    )
}
export default Details;

