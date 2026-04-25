import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import DefaultDashboard from './pages/DefaultDashboard.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Notes from './pages/Notes.jsx'

import "./App.css"



const App = () => {

  const loginAuth = JSON.parse(localStorage.getItem("loginAuth"));
  const isLoggedIn = loginAuth?.isLoggedIn;

  return (
        <div className='container'>
          <Navbar />

          <Routes>
            <Route path='/' element={isLoggedIn ? <UserDashboard /> : <DefaultDashboard />} />
            <Route path='userdashboard' element={<UserDashboard />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/login' element={<Login />}  />
            <Route path='/signup' element={<Signup />}  />
          </Routes>
        </div>
  )
}

export default App