import React from 'react'

const AdminProfile = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#1C2526] font-sans'>
      <h2 className='text-white text-4xl mb-5 drop-shadow-lg'>Admin Profile</h2>
      <div className='bg-[rgba(44,54,57,0.8)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-[rgba(255,255,255,0.1)] backdrop-blur-lg'>
        <p className='text-[#D3D3D3]'>Welcome to the admin profile page.</p>
      </div>
    </div>
  )
}

export default AdminProfile