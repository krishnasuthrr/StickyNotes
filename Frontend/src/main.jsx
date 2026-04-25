import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import UserProvider from './context/UserContext.jsx'
import NoteUpdateProvider from './context/NoteUpdateContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <NoteUpdateProvider>
          <App />
        </NoteUpdateProvider>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
)
