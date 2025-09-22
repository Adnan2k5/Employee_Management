import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { LandingPage } from './Pages/LandingPage'
import { Login } from './Pages/Auth/Login'
import { Register } from './pages/auth/Register'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store, { clearUser, setUser, setLoading } from './context/userContext'
import { validateUser } from './api/authcontroller'
import { Auth } from './security/Auth'
import { UserLoggedIn } from './security/loginAuth'
import { Loader } from './components/Loader'
import EmployeeDashboard from './pages/dashboard'
import ManagerDashboard from './pages/manager/dashboard'

function App() {

  const [appLoading, setAppLoading] = useState(true);
  useEffect(() => {
    const res = async () => {
      store.dispatch(setLoading(true));
      try {
        const response = await validateUser();
        if (response.status == 200) {
          store.dispatch(setUser(response.data));
        } else {
          store.dispatch(setLoading(false));
        }
      } catch (error) {
        store.dispatch(setLoading(false));
      }
      finally {
        setAppLoading(false);
      }
    }
    res();
  }, []);
  if (appLoading) {
    return <Loader />;
  }
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserLoggedIn><Login /></UserLoggedIn>} />
          <Route path='/register' element={<UserLoggedIn><Register /></UserLoggedIn>} />
          <Route path='/dashboard' element={
            <Auth>
              <EmployeeDashboard />
            </Auth>
          } />
          <Route path='/manager' element={<ManagerDashboard />} />
        </Routes>

      </BrowserRouter>
    </Provider >
  );
}

createRoot(document.getElementById('root')).render(<App />)
