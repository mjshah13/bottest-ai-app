import React from 'react'
import { SignUp } from "@clerk/nextjs";

const Signuppage = () => {
  return (
    <>
    <div className='h-screen w-full flex justify-center items-center'>
    <SignUp />
    </div>
    
    </>
  )
}

export default Signuppage