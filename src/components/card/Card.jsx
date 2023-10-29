import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import style from './Card.module.css'

function Card({game}) {


  return (
    <div className={style.card}>
      <Link to={`/detail/${game.id}`}>
      <div className={style.imgH}>
        <h2 className={style.name}>Name: {game.name}</h2>
        <img src={game.image} alt={game.name} />
      </div>
      </Link>

        <div className={style.hCont}>
          <h3>Price: ${game.price}</h3>
          <div className={style.platforms}>
           <h4>Genres: {game.genres.join(',')}</h4>
           <p>Platforms: {game.platforms.join(', ')}</p>
          </div>
        </div>
    </div>
  )
}
Card.propTypes= {
  game: PropTypes.object.isRequired,
}

export default Card;


