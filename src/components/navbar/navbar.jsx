import { Link, NavLink, useLocation } from 'react-router-dom';
import Search from '../search/Search';
import style from './Navbar.module.css'

function Navbar() {
  const location = useLocation();
  
  return (
    <div className={style.wrap}>
      <div className={style.content} >
        {location.pathname !== '/login' && (
          <div className={style.contentHb}>
            <Search/>
            <div className={style.butn}>
            <Link to= '/cart'><h2>🛒</h2></Link>
              <Link to= '/auth'><button >Log In</button></Link>
            </div>
          </div>
        )}
        <div className={style.navContent}>
          <NavLink className={style.homeForm} to= '/'>Home</NavLink>
          <NavLink className={style.homeForm} to= '/store'>Store</NavLink>
          <NavLink className={style.homeForm} to= '/library'>Library</NavLink>
          <NavLink className={style.homeForm} to= '/about'>About</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar;