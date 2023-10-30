import { useEffect, useState } from 'react'
import React from 'react'
import '../styles/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import logoImage from '../assets/Logo.png'
import pizzaImage from '../assets/pizza2.png'
import { toast } from 'react-toastify'

export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //TOAST FUNCTIONS
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const email_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number

    const postData = () => {
        //VALIDATION
        if (email_regex.test(email) === false) {
            notifyA("Invalid Email")
            return
        }
        else if (password_regex.test(password) === false) {
            notifyA("Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
            return
        }
        //SEND DATA TO SERVER 
        fetch("http://localhost:3000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                username: username,
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyA(data.error)
                }
                else {
                    notifyB(data.message)
                    navigate('/signin')
                }
            })
    }
    return (
        <div className='signup-container'>
            <div className="Imagediv">
                <img className="pizzaImg" src={pizzaImage} alt="" />
            </div>
            <div className="form-div">
                <h1 className='subheading'>Sign-up to see licious recipies from your friends with <span class="nom-nom">Foodstagram.</span></h1>
                <div className="signupform"><h1 className='signup'>Sign Up</h1>
                    <div className="inputs">
                        <div className="firsttwo">
                            <div className="email">
                                <p>Email</p>
                                <div className = "input-container">
                                    <input className="input" type="email" name="email" id="email" value={email} placeholder='Email'
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                            </div>
                            <div className="name">
                                <p>Name</p>
                                <div className = "input-container">
                                    <input className="input" type="text" name="name" id="name" value={name} placeholder='Full Name'
                                        onChange={(e) => { setName(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="othertwo">
                            <div className="username">
                                <p>Username</p>
                                <div className = "input-container">
                                    <input className="input" type="text" name="username" id="username" value={username} placeholder='Username'
                                        onChange={(e) => { setUserName(e.target.value) }} />
                                </div>
                            </div>
                            <div className="password">
                                <p>Password</p>
                                <div className = "input-container">
                                    <input className="input" type="password" name="password" id="password" value={password} placeholder='Password'
                                        onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="loginpara">
                        <p>
                            By signing up you agree to our Terms , Data Policy and Cookies Policy .
                        </p>
                    </div>
                    <input className="signup-btn" type="submit" id="submit-btn" value="Sign Up" onClick={() => postData()} />
                </div>
                <div className="form2">
                    <p>Already have an account ?
                        <span><Link to="/signIn"> SignIn</Link></span></p>
                </div>
            </div>
        </div>

    )
}