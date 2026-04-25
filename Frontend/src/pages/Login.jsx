import { Link } from "react-router-dom"
import axios from "axios";
import "../styles/login.css"
// import { AuthContext } from "../context/AuthContext";
// import { UserContext } from "../context/UserContext";
import { useState,useEffect } from "react";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const data = JSON.parse(localStorage.getItem("loginAuth"))
    return data?.isLoggedIn || false;
  })
  const [loggedInUser, setloggedInUser] = useState(() => {
    const data = JSON.parse(localStorage.getItem("loginAuth"))
    return data?.loggedInUser || '';
  })

  useEffect(() => {
    const loginAuth = {
      isLoggedIn,
      loggedInUser
    }

      localStorage.setItem("loginAuth", JSON.stringify(loginAuth))
  }, [isLoggedIn, loggedInUser])
  

  function submitHandler(e) {
    e.preventDefault(); 
  } 

  async function loginHandler() {
    
    try {
      
      const res = await axios.post("http://localhost:3000/login", {
        username: username.toLowerCase(),
        password
      })

      alert(res.data.message)
      
      if(res.status === 200) {
        setIsLoggedIn(true)
        setloggedInUser(username.toLowerCase())
      }

    } catch (error) {
      alert(error.response.data.message)
    }

    location.reload()

  }
  
  return (
    <div className="login">
            <h1>Log In:</h1>
            <form>
              <input 
                required 
                type="text" 
                placeholder="Enter your Username" 
                value={username} 
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input 
                required 
                type="password" 
                placeholder="Enter your Password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <button onClick={(e) => {
                submitHandler(e);
                loginHandler();
              }}>
                Log In
              </button>
            </form>
            <p>Don't have an Account? <Link to='/signup'>Sign Up</Link></p>
        </div>
  )
}

export default Login