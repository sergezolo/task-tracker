import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Footer = () => {

    const location = useLocation();

    return (
        <footer>
            <a href="https://youtu.be/w7ejDZ8SWv8" target="_blank">Traversy Media | React JS Crash Course 2021</a>
            <br/>
            {location.pathname === '/' && <Link to='/about'>About</Link>}
            {location.pathname === '/about' && <Link to='/'>Home</Link>}
        </footer>
    )
}

export default Footer;