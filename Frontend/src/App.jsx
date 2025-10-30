import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './Pages/start.jsx'
import UserLogin from './Pages/Auth/UserLogin.jsx'
import UserRegister from './Pages/Auth/UserRegister.jsx'
import CaptainLogin from './Pages/Auth/CaptainLogin.jsx'
import CaptainRegister from './Pages/Auth/CaptainRegister.jsx'
import getCurrentUser from './Hooks/getCurrentUser.js'
import { useDispatch, useSelector } from 'react-redux'
import getCurrentCaptain from './Hooks/getCurrentCaptain.js'

const App = () => {

  const{userData}= useSelector((state)=>state.user)
  const {captainData}= useSelector((state)=>state.captain)
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!userData){
      getCurrentUser(dispatch);
    }
    if(!userData && !captainData){
      getCurrentCaptain(dispatch);
    }
  },[userData,captainData,dispatch])

  // console.log(userData,captainData)

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path='/user/login' element={<UserLogin/>} />
      <Route path='/user/register' element={<UserRegister/>} />
      <Route path='/captain/login' element={<CaptainLogin/>} />
      <Route path='/captain/register' element={<CaptainRegister/>} />
    </Routes>
  )
}

export default App
