import { Link } from "react-router-dom"
import "../styles/login.css"
import { useState } from "react"
import axios from "axios"

const Signup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function submitHandler(e) {
    e.preventDefault(); 
  } 

  async function signupHandler() {
    
    try {
      if(confirm !== password) {
        alert("Created password and Confirm password must be equal")
        return;
      }

      const res = await axios.post("http://localhost:3000/signup", {
        username: username.toLowerCase(),
        password
      })

      alert(res.data.message)
      
      } catch (err) {
        alert(err.response.data.message)
      }

  }

  return (
    <div>
        <div className="login">
            <h1>Sign Up:</h1>
            <form>
              <input 
                required 
                type="text" 
                placeholder="Create a Username" 
                value={username} 
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input 
                required 
                type="password" 
                placeholder="Create a Password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <input 
                required 
                type="password" 
                placeholder="Confirm Password" 
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value)
                }}
              />
              <button onClick={(e) => {
                submitHandler(e);
                signupHandler()
              }}>
                Sign Up
              </button>
            </form>
            <p>Already a User? <Link to='/login'>Log In</Link></p>
        </div>
    </div>
  )

}

export default Signup