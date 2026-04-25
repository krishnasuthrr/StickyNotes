import "../styles/navbar.css"
import { Link } from "react-router-dom"
import { User, LogOut } from "lucide-react"

const Navbar = () => {

  const loginAuth = JSON.parse(localStorage.getItem("loginAuth"))
  const isLoggedIn = loginAuth?.isLoggedIn

  function logoutHandler(){
    const logoutConfirm = confirm("Are you sure that you want to Log Out of your account?")
    if (logoutConfirm) {
      localStorage.setItem("loginAuth", JSON.stringify(
        {
          isLoggedIn: false,
          LoggedInUser: ''
        }
      ))
    } else {
      return;
    }
    window.location.reload();
  }

  return (
    <div className="navbar">
        <Link to='/' className="link">StickyNotes</Link>
        <div className="nav-links">
            <Link to='/'>Home</Link>
            <Link to='/notes'>Your Notes</Link>
            {isLoggedIn ? <button onClick={logoutHandler} className="logOutBtn"> Log Out <LogOut size={15} strokeWidth={2.5} /> </button> : <Link to='/login'><User size={30} /></Link>}
        </div>
    </div>
  )
}

export default Navbar