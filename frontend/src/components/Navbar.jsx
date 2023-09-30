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
                    <Link className="a" to="/profile" >
                        <li>Profile</li>
                    </Link>
                    <Link className="a" to="/createPost" >
                        <li>Create</li>
                    </Link>
                </>
            ]
        }
        else{
            return [
                <>
                    <Link className="a" to="/signup">
                        <li>SignUp</li>
                    </Link>
                    <Link className="a" to="/signin">
                        <li>SignIn</li>
                    </Link>
                </>
            ]
        }
    }

    return (
        <div className='navbar'>
            <Link to="/">
                <img className="navLogo" src={logoImage} alt="logo"/>
            </Link>
            <ul className='navMenu'>
                {loginStatus()}
            </ul>
        </div>
    )
}
