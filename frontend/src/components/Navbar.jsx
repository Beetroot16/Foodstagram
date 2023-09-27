import React from 'react'
import logoImage from '../assets/Logo.png';
import '../styles/navbar.css';
import {Link} from 'react-router-dom';

export default function navbar() {
    return ( 
        <div className='navbar'>
            <Link to="/">
                <img src={logoImage} alt="logo" className='logo'/>
            </Link>
            <ul className='navMenu'>
                <Link to="/signup">
                    <li>SignUp</li>
                </Link>
                <Link to="/signin">
                    <li>SignIn</li>
                </Link>
                <Link to="/profile" >
                    <li>Profile</li>
                </Link>
            </ul>
        </div> 
    )
}
