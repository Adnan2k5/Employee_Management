import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { LandingPage } from './Pages/LandingPage'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>,
)
