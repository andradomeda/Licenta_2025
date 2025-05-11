import './NavBar.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../GlobalContext';

const NavBar = () => {
    const { isAuthenticated } = useGlobalContext(); 

    return (
        <div className="nav">
          <div className="nav-logo">Miau</div>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/events">Evenimente</Link></li>
            <li><Link to="/auth">Autentificare</Link></li>
            {isAuthenticated && ( 
              <div>
              <li><Link to="/profile">Profilul meu</Link></li>
              <li><Link to="/general">General</Link></li>
              </div>
            )}
          </ul>
        </div>
    );
}

export default NavBar;
