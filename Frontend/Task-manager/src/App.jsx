import { useState } from 'react'
import Register from './components/pages/Register'
import './App.css'
import Login from './components/pages/Login'
import {Routes,Route} from 'react-router-dom'
import Home from './components/pages/Home'
import ProtectedRoute from './components/pages/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
    <Routes>
      <Route path="/" index element={<Register/>}/>
      
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
