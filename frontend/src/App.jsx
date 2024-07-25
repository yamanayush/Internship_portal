
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/login/Login'
import SignUp from './page/signup/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import DashBoard from './page/DashBoard'
import NavBar from './components/NavBar'

function App() {
  const { authUser }=useAuthContext();
  return (
    <div className='flex flex-col flex-wrap gap-6'>
      <div className='w-full shadow-xl border mb-3 backdrop-filter backdrop-blur-lg'>
        <NavBar />
      </div>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          </Routes>
          <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
            <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
            <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />}></Route>
            <Route path='/dashboard' element={authUser ? <DashBoard /> : <Navigate to='/login' />}></Route>
            
            </Routes>
          </div>
          <Toaster />
      <div>

      </div>
    </div>
  )
}

export default App
