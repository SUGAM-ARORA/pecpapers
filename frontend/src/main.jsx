import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Components/Login.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Browse from './Pages/Browse.jsx'
import Hero from './Components/Hero.jsx'
import { AppProvider } from './context/AppContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <ProtectedRoute><App/></ProtectedRoute>,
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
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
    </AppProvider>
  </StrictMode>,
)
