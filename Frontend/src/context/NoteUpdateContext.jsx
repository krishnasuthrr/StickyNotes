import { createContext, useState } from "react";

export const NoteUpdateContext = createContext()

function NoteUpdateProvider({ children }) {
    const [noteUpdate, setNoteUpdate] = useState(false)

    return (
        <NoteUpdateContext.Provider value={ [noteUpdate, setNoteUpdate ] }>
            {children}
        </NoteUpdateContext.Provider>
    )
}

export default NoteUpdateProvider;