import axios from "axios"
import "../styles/note-card.css"
import { useState } from "react"
import NoteUpdateModal from "./NoteUpdateModal.jsx"
import { createPortal } from "react-dom"

const NoteCard = ({ title, body, id }) => {

  const [isOpen, setIsOpen] = useState(false)

  async function deleteHandler() {
    await axios.delete(`http://localhost:3000/delete/${id}`)
    location.reload()
  }

  function updateHandler() {
    setIsOpen(true)
  }

  return (
    <div className="note">
      <div className="text-content">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      
      <div className="buttons">
        <button onClick={deleteHandler}>Delete</button>
        <button onClick={updateHandler} className="edit-btn">Edit</button>
      </div>

      {isOpen && createPortal(
        <NoteUpdateModal closeModal={() => setIsOpen(false)} id={id} />
      , document.getElementById("modal-root"))
      }

    </div>
  )
}

export default NoteCard