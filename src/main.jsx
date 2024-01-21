import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/Login'
import Signup from './components/Register'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import { AuthUserProvider } from './firebase/auth.firebase'
import ForgetPassword from './components/ForgetPassword.jsx'
import Default from './components/Default.jsx'



const Route = createBrowserRouter([
  

  {
    
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />

      },
      {
        path: 'home',
        element: <App />
      },

      {
        path: 'register',
        element: <Signup />
      },

      {
        path: 'forgetpassword',
        element: <ForgetPassword/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
  <AuthUserProvider>
      <RouterProvider router={Route} />
  </AuthUserProvider>
    </React.StrictMode>,
)
