import './NavBar.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../GlobalContext'; // 🔥 Importăm contextul

const NavBar = () => {
    const { isAuthenticated } = useGlobalContext(); // 🔥 Luăm dacă e autentificat

    return (
        <div className="nav">
          <div className="nav-logo">Miau</div>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/events">Evenimente</Link></li>
            <li><Link to="/auth">Autentificare</Link></li>
            {isAuthenticated && ( 
              <li><Link to="/profile">Profilul meu</Link></li>
            )}
          </ul>
        </div>
    );
}

export default NavBar;
