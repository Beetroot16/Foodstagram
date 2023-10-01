import React from 'react'
import { useEffect, useState } from 'react'
import '../styles/signin.css'
import { Link, useNavigate } from 'react-router-dom'
import pizzaImage from '../assets/pizza.png'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { LoginContext } from '../context/login-context'

export default function SignIn() {
    const { setUserLogin } = useContext(LoginContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //TOAST FUNCTIONS
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const validateUser = () => {
        fetch("http://localhost:3000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
                    console.log(data.token)
                    localStorage.setItem("jwt", data.token)
                    setUserLogin(true)
                    navigate('/')
                }
            })
    };

    return (
        <div className='signin-container'>
            <div className="form-div">
                <h1 className='subheading'>In every bite, there's a story waiting to be told. Explore the world one recipe at a time with <span class="nom-nom">Nom-Nom.</span></h1>
                <div className="loginform">
                    <div className="input-div">
                        <div className="email">
                            <p>Email</p>
                            <div>
                                <input className="input" type="email" name="email" id="email" placeholder='Email'
                                    onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                        </div>
                        <div className="password">
                            <p>Password</p>
                            <div>
                                <input className="input" type="password" name="password" id="password" placeholder='Password'
                                    onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <input className="signin-btn" type="submit" id="login-btn" value="Sign In" onClick={() => validateUser()} />
                </div>
                <div className="loginForm2">
                    <p>Already have an account ?
                        <span className='blu'><Link to="/signUp"> SignUp</Link></span></p>
                </div>
            </div>
            <div className="Imagediv">
                <img className="pizzaImg" src={pizzaImage} alt="" />
            </div>
        </div>
    )
}
