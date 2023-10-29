import PropTypes from "prop-types";
import '../style/NewsStyle.css'

function News({name,image,price}) {
  return (
    <div className='card'>
      <img className='image' src={image} alt="" />
        <div className='TP'>
        <h5 className='title'>{name}</h5>
        <p className='price'>$/{price}</p>
        </div>
    </div>
  )
}
News.propTypes= {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
}

export default News