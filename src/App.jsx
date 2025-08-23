// App.jsx
import { useEffect } from 'react';
import Home from './pages/Home/Home.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthenticationStatus } from '@nhost/react';
import './App.css'
export default function App() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  useEffect(() => {
  if (isLoading) return;

    if (isAuthenticated) {
      if (window.location.pathname === '/login') {
        navigate('/');   // agar login hogya aur abhi bhi /login par hai, to home bhej do
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
}