import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { authUser }=useAuthContext();
  const { loading,logout } =useLogout();
  const navigate=useNavigate();
  const handleLogout= async (e)=>{
    e.preventDefault()
    await logout();
  }
  const handleSignup=async (e)=>{
    e.preventDefault();
    navigate('/signup');
  }
  const handleLogin=async (e)=>{
    e.preventDefault();
    navigate('/login');
  }
  const handleDashBoard=async (e)=>{
    e.preventDefault();
    navigate('/dashboard');
  }
  const handleHome=async (e)=>{
    e.preventDefault();
    navigate('/');
  }
  return (
    <div className='w-full flex p-5 justify-between'>
        <div className='flex'>
            <div className='cursor-pointer bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5' onClick={handleHome}>Home</div>
            <div className='cursor-pointer bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5' onClick={handleDashBoard}>dashboard</div>
        </div>
        <div>

        {!authUser&&
          <div className='flex'>
            <div className='cursor-pointer bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5' onClick={handleSignup}>signup</div>
            <div className='cursor-pointer bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5' onClick={handleLogin}>login</div>
          </div>
        }
        {authUser && <div className='cursor-pointer bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5' onClick={handleLogout}>logout</div>}
        </div>
    </div>
  )
}

export default NavBar