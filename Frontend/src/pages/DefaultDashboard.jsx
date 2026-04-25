import "../styles/default-dash.css"
import { Link } from "react-router-dom"

const DefaultDashboard = () => {
  return (
    <div className="default-dashboard">
        <div className="text">
            <h1>Plan Your Day! 🙌</h1>
            <h3>Get Productive Now:</h3>
            <Link to='/login' className="link">LogIn / SignUp</Link>
        </div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/023/492/712/small/3d-notes-icon-png.png" draggable='false' alt="" />
    </div>
  )
}

export default DefaultDashboard