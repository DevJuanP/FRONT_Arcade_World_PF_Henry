import PropTypes from "prop-types";
import '../style/DStyle.css'

function MoreDownload({name,image,price}) {
  return (
    <div className='cards'>
        <img className='images' src={image} alt="" />
    <div className='TPS'>
    <h5 className='titles'>{name}</h5>
    <p className='prices'>$/{price}</p>
    </div>
    </div>
  )
}
MoreDownload.propTypes= {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
}

export default MoreDownload