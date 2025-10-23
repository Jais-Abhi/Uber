import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './Components/start.jsx'
import UserLogin from './Components/Auth/userLogin.jsx'
import UserRegister from './Components/Auth/userRegister.jsx'
import CaptainLogin from './Components/Auth/captainLogin.jsx'
import CaptainRegister from './Components/Auth/captainRegister.jsx'

const App = () => {
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
