import NoteCard from "../components/NoteCard"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import "../styles/notes.css"
import { NoteUpdateContext } from "../context/NoteUpdateContext"

const Notes = () => {

  const loginAuth = JSON.parse(localStorage.getItem("loginAuth"))
  const isLoggedIn = loginAuth?.isLoggedIn
  const username = loginAuth?.loggedInUser

  const [notes, setNotes] = useState([])

  const [ noteUpdate, _setNoteUpdate ] = useContext(NoteUpdateContext)

  useEffect(() => {
    getNotes();
  }, [noteUpdate])

  async function getNotes() {
    const res = await axios.get(`http://localhost:3000/notes?username=${username}`)
    const notesArray = res?.data?.notesArray?.reverse()
    setNotes(notesArray);
  }
  

  if(isLoggedIn) {

    return (
    <div className="notes">
      <h1>Your Notes:</h1> 
      <h4><Link to='/'>Create a new Note</Link></h4>
      <button onClick={() => { location.reload() }}>Refresh</button>
      <div className="notes-container">
        {
          (notes.length > 0)
          ? notes.map((note) => {
            const { title, body, _id } = note
            return <NoteCard title={title} body={body} id={_id} key={_id} />  
          })
          : <h2 className="no-notes">No Notes Yet</h2>
        }
      </div>
    </div>
  )

  } else {

    return (
      <div className="notes">
        <h3><Link to='/login'>Login</Link> to see your Notes</h3>
      </div>
    )

  }
}

export default Notes