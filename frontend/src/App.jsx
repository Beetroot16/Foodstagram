import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreatePost from './components/CreatePost'
import React, { createContext } from 'react'
import { LoginContext } from './context/login-context'
import Modal from './components/Modal'

function App() {
  const [userLogin, setUserLogin] = useState(false)
  const [modal, setModal] = useState(false)

  return (
    <BrowserRouter>
      <>
        <LoginContext.Provider value={{setUserLogin, setModal}}>
          <Navbar login={userLogin}/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/createPost" element={<CreatePost />}></Route>
          </Routes>
          <ToastContainer />
          {modal && <Modal setModal={setModal}/>}
          {/* <Modal></Modal> */}
        </LoginContext.Provider>
      </>
    </BrowserRouter>
  )
}

export default App
