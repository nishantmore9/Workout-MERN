import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Layout from './Layout.jsx'
import { WorkoutContextProvider } from './context/WorkOutContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import { useAuthContext } from './hooks/useAuthContext.js'



const AppRoutes = () => {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to="/" />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <AppRoutes />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
