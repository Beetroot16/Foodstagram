import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
        <ToastContainer/>
      </> 
    </BrowserRouter>
  )
}

export default App
