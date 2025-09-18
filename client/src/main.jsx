import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { LandingPage } from './Pages/LandingPage'
import { Login } from './Pages/Auth/Login'
import { Register } from './pages/auth/Register'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  </BrowserRouter>,
)
