import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, Navigate, RouterProvider, useNavigate} from 'react-router-dom'
import Login from './Components/Login.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Browse from './Pages/Browse.jsx'
import Hero from './Components/Hero.jsx'
import { AppProvider } from './context/AppContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children: [{
      path : '/browse',
      element: <Browse/>
    },
    {
      // path : '/',
      index:true,
      element : <Hero/>
    }
  ]
  },
  {
    path: '/login',
    element : <Login/>
  },
  {
    path: '/sso-callback',
    element: <Navigate to="/" replace />
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} frontendApt="https://sweeping-bobcat-34.clerk.accounts.dev" >
    <RouterProvider router={router}/>
    </ClerkProvider>
    </AppProvider>
  </StrictMode>,
)
