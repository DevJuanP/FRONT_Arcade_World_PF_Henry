import PropTypes from "prop-types";
import '../style/RatingStyle.css'

function Rating({name,image,price}) {
  return (
    <div className='cardss'>
        <img className='imagess' src={image} alt=""/>
        <div className='TPSS'>
        <h5 className='titless'>{name}</h5>
        <p className='pricess'>{price}</p>
        </div>
    </div>
  )
}
Rating.propTypes= {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
}

export default Rating