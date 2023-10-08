import React, {useContext} from 'react'
import logoImage from '../assets/Logo.png';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/login-context';

export default function navbar(login) {

    const loginStatus = () => {
        const {setModal} = useContext(LoginContext);
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
                    <Link className="a" to={""}>
                        <button className='primaryBtn' onClick={() => setModal(true)}>Logout</button>
                    </Link>
                </>
            ]
        }
        else {
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
            <div className="logodiv">
                <Link to="/">
                    <img className="navLogo" src={logoImage} alt="logo" />
                </Link>
            </div>
            <ul className='navMenu'>
                {loginStatus()}
            </ul>
        </div>
    )
}
