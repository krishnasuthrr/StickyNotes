import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import "../styles/user-dash.css"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { NoteUpdateContext } from "../context/NoteUpdateContext";

function UserDashboard(){

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [notes, setNotes] = useState([])
    const [count, setCount] = useState(0)

    const [ noteUpdate, _setNoteUpdate ] = useContext(NoteUpdateContext)

    const loginAuth = JSON.parse(localStorage.getItem("loginAuth"));
    const username = loginAuth?.loggedInUser;

    useEffect(() => {
        noteRender();
    }, [count, noteUpdate])

    async function submitHandler(e){
        e.preventDefault()
        
        try {
            const noteObj = {
                title: title,
                body: body,
                username
            }
            await axios.post("http://localhost:3000/create-note", noteObj)
        } catch (error) {
            alert(error?.response?.data?.message);
        }

        setCount(prev => prev + 1)
        setTitle("")
        setBody("")
    }

    async function noteRender() {

        try {
            const res = await axios.get(`http://localhost:3000/notes?username=${username}`)
            const notesArray = res.data.notesArray
            setNotes(notesArray.reverse())

        } catch (error) {
            console.error(error.response)
        }

    }


  return (
    <div className="user-dashboard">
        <div className="create-note">
            <div className="note-container">
                <h1 className="welcome-text">Welcome back, {username || "User"} 👋</h1>
                <h2>Create a new Note:</h2>
                <form>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    <textarea 
                        placeholder="Body"
                        value={body}
                        onChange={(e) => {
                            setBody(e.target.value)
                        }}
                    ></textarea>
                    <button onClick={(e) => {
                        submitHandler(e)
                    }}>Create Note</button>
                </form>
            </div>
        </div>
        <div className="display-notes">
            <h2>Recent Notes - <Link to='/notes' className="notes-link">View All</Link></h2>
            <div className="notesContainer">
                { 
                    notes.length > 0
                    ? notes.map((note, idx) => {
                        const { title, body, _id } = note
                        if (idx === 6) return;
                        return <NoteCard title={title} body={body} id={_id} key={_id} />
                    }) 
                    : <h3 className="no-notes">No Notes Yet</h3>
                    
                }
            </div>
        </div> 
    </div>
  )
}

export default UserDashboard