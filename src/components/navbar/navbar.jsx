import { Link, NavLink, useLocation } from 'react-router-dom';
// import Profile from '../profile/Profile'
import Search from '../search/Search';
import style from './Navbar.module.css'
import logo from './logo1Sinfondo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutButton from '../auth/Logout';

function Navbar() {
  const location = useLocation();
  
  return (

    <div className={style.navbar}>
      
      <img src={logo} alt="logo" className={style.logo}/>
      {location.pathname !== '/auth' && location.pathname !== '/' && location.pathname !== '/library' && location.pathname !== '/about' && (

          <Search/>
      )}
      <div className={style.navContent}>
        <NavLink className={style.homeForm} to= '/'>Home</NavLink>
        <NavLink className={style.homeForm} to= '/store'>Store</NavLink>
        <NavLink className={style.homeForm} to= '/library'>Library</NavLink>
        <NavLink className={style.homeForm} to= '/about'>About</NavLink>
        <LogoutButton />
      </div>
      <div>
      {location.pathname !== '/auth' && (
        <>
          <div className={style.butn}>
            <Link to= '/cart'><ShoppingCartIcon sx={{color:'#f1f1f1'}}/></Link>
            {location.pathname !== '/user/profile' && (
              <Link to= '/auth'><button className={style.button} >Log In</button></Link>
            )}
          </div>
        </>
      )}
      </div>
    </div>
   )
}

export default Navbar;