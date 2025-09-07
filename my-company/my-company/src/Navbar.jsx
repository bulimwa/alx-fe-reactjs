import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ backgroundColor: 'navy', padding: '1rem' }}>
            <Link to="/" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Home</Link>
            <Link to="/about" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>About</Link>
            <Link to="/services" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Services</Link>
            <Link to="/contact" style={{ color: 'white', margin: '0 1rem', textDecoration: 'none' }}>Contact</Link>
        </nav>
    );
}

export default Navbar;
