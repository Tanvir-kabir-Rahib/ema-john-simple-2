import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../contexts/UserContext';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => { console.error(error) })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                <Link to="/login" className={user ? "d-none" : ""}>Login</Link>
                <Link to="/signup" className={user ? "d-none" : ""}>Sign Up</Link>
            </div>
            <button className={user ? "logout-btn" : "d-none"} onClick={handleLogOut}>
                <span>Log Out</span>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
        </nav>
    );
};

export default Header;