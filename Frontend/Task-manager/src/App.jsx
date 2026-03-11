import Register from './components/pages/Register'
import './App.css'
import Login from './components/pages/Login'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import ProtectedRoute from './components/pages/ProtectedRoute'

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" index element={<Register/>}/>
      
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
