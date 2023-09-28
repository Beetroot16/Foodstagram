import React from 'react'
import logoImage from '../assets/Logo.png';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

export default function navbar(login) {

    const loginStatus = () => {
        const token = localStorage.getItem('jwt');
        if (login.login || token) {
            return [
                <>
                    <Link to="/profile" >
                        <li>Profile</li>
                    </Link>
                    <Link to="/createPost" >
                        <li>Create</li>
                    </Link>
                </>
            ]
        }
        else{
            return [
                <>
                    <Link to="/signup">
                        <li>SignUp</li>
                    </Link>
                    <Link to="/signin">
                        <li>SignIn</li>
                    </Link>
                </>
            ]
        }
    }

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={logoImage} alt="logo" className='logo' />
            </Link>
            <ul className='navMenu'>
                {loginStatus()}
            </ul>
        </div>
    )
}
