import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { LandingPage } from './Pages/LandingPage'
import { Login } from './Pages/Auth/Login'
import { Register } from './pages/auth/Register'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from './context/userContext'
import { userContext } from './context/userContext'
import { validateUser } from './api/authcontroller'
import { Loader } from './components/Loader'

function App() {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const res = async () => {
      setLoading(true);
      try {
        const response = await validateUser();
        if (response.status == 200) {
          store.dispatch(userContext.actions.setUser(response.data));
        }
      } catch (error) {
        store.dispatch(userContext.actions.clearUser());
      }
      finally {
        setLoading(false);
      }
    }
    res();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider >
  );
}

createRoot(document.getElementById('root')).render(<App />)
