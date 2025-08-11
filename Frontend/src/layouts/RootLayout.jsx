import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    // Screen
    <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
      <Outlet/>
    </div>
  )
}

export default RootLayout
