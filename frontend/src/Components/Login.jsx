import { SignIn, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { isSignedIn,isLoaded } = useUser();
  const navigate = useNavigate()

  useEffect(()=>{
      if(isLoaded && isSignedIn)
      {
          navigate('/');
      }
  },[]);
  return (
    <div className='flex flex-row justify-center items-center w-screen h-screen '>
      <SignIn/>
    </div>
  )
}

export default Login
