import React from 'react'
import { useEffect, useState} from 'react'
// import '../styles/signin.css'
import {Link , useNavigate} from 'react-router-dom'
import logoImage from '../assets/Logo.png'
import { toast } from 'react-toastify'

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //TOAST FUNCTIONS
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    const validateUser = () => {
        fetch("http://localhost:3000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.error){
                notifyA(data.error)
            }
            else{
                notifyB(data.message)
                console.log(data.token)
                localStorage.setItem("jwt",data.token)
                navigate('/profile')
            }
        })
    };

    return (
        <div>
            <div className="loginForm">
                <img src={logoImage} alt="" />
                <div>
                    <input type="email" name="email" id="email" placeholder='Email' 
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder='Password' 
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <input type="submit" id="login-btn" value="Sign In" onClick={() => validateUser()}/>
            </div>
            <div className="loginForm2">
                <p>Already have an account ?
                <span><Link to="/signUp"> SignUp</Link></span></p>
            </div>
        </div>
    )
}
