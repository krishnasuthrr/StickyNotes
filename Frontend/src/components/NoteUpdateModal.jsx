import { useState, useEffect, useContext } from "react"
import "../styles/update-modal.css"
import axios from "axios"
import { NoteUpdateContext } from "../context/NoteUpdateContext"

const NoteUpdateModal = ({ closeModal, id }) => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const [prevNoteTitle, setPrevNoteTitle] = useState('')
    const [prevNoteBody, setPrevNoteBody] = useState('')

    const [ _noteUpdate, setNoteUpdate ] = useContext(NoteUpdateContext)

    useEffect(() => {
        getNoteData()
    }, [])

    async function getNoteData() {
        const res = await axios.get(`http://localhost:3000/notes/${id}`)
        setPrevNoteTitle(res.data.title)
        setPrevNoteBody(res.data.body)
    }

    async function updateHandler() {

        const updatedNote = {
            title, 
            body
        }
        try {
            const res = await axios.patch(`http://localhost:3000/update/${id}`, updatedNote)
            alert(res.data.message)
            closeModal()
        } catch (error) {
            alert(error?.response?.data?.message)
        }

        setNoteUpdate(prev => !prev) // toggle variable to make a state change to re-render notes using useEffect

    }

  return (
    <div className="overlay">
        <div className="update-modal">

            <div className="update-section">
                <h2>Update Your Note:</h2>
                <input 
                    type="text" 
                    placeholder="Enter Updated Title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <textarea 
                    placeholder="Enter Updated Body"
                    value={body}
                    onChange={(e) => { setBody(e.target.value) }}
                ></textarea>
                <button onClick={updateHandler}>Save Changes</button>
            </div>

            <div className="update-view">
                <div className="display-updated-note">
                    <h2>{title || prevNoteTitle}</h2>
                    <p>{body || prevNoteBody}</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default NoteUpdateModal