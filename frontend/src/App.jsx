import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import FormDialog from './Components/FormDialog';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Footer from './Components/Footer';

const App = () => {

  // const {user,isLoaded,isSignedIn} = useUser()
  // const navigate = useNavigate();
  // console.log(user)

  // useEffect(()=>{
  //   if(isLoaded && !isSignedIn){
  //     navigate('/login')
  //   }
  // },[isLoaded,isSignedIn])

  return (

    <div className='flex flex-col'>
      <div>
        <Navbar />
      </div>
      <Outlet />
      <div className='flex flex-col items-center mt-5'>
        <FormDialog />
      </div>
      <div>
        {/* <Footer/> */}
      </div>
    </div>
  )
}

export default App
