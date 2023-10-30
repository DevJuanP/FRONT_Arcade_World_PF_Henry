
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { gameById } from '../../redux/actions.js';
import style from './details.module.css'

const Details = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();
    let gameId = useSelector((state)=> state.gameId);

        useEffect(()=>{
        dispatch(gameById(id))
    },[id, dispatch])

    return (
    <div>
        <div className={style.contentDetail}>
          <div className={style.contentBtn}>
            <Link to='/store'>
              <button>Return to Store</button>
            </Link>
          </div>
          <div className={style.detail}>

            {Object.keys(gameId).length > 0 && (
                <div className={style.contentMap}>
                  <img src={gameId['image']} alt={gameId['name']} />

                  <div className={style.dataMap}>
                    <h1 className={style.name}>Name: {gameId['name']}</h1>
                    <h3>Price: ${gameId['price']}</h3>
                    <h3>Genres: {gameId['genres'].join(', ')}</h3>
                    <h3>Platforms: {gameId['platforms'].join(', ')}</h3>
                    <div className={style.description}>
                      <h4>About the game:</h4><p>{gameId['description']}</p>
                    </div>
                    <h5>Released: {gameId['released']}</h5>
                  </div>

                </div>
            )}
          </div>
    
          <div className={style.buttons}>
            <button>Add 🎮</button>
            <button>Buy 🛒</button>
          </div>
        </div>
            <div className={style.commets}>
                <h4>Comments:</h4>
            <form className={style.message}>
             <label >Message:</label>
                <textarea id='message' name='message'></textarea>
                <button type="submit" className={style.btn}>Submit</button>
            </form>
            </div>
            <br /> 
    </div>
      );
    };
    
    export default Details;

