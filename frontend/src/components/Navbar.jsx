import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleSubmit = () => {
    logout()
  }
  return (
    <nav className='h-20 flex items-center max-w-7xl m-auto py-4 px-10 justify-between shadow-md'>
      <div className='flex justify-around items-center gap-5'>
        <img src="https://img.icons8.com/?size=100&id=jNKypI1BeVDU&format=png&color=000000" alt="img" height={50} width={50} />
        <Link to = "/"><h1 className='font-bold text-4xl font-mono'>Workout Buddy</h1></Link>
      </div>
      <div>
        {user && (
          <div className='flex gap-3'>
            <div>{user.email}</div>
            <button onClick={handleSubmit}>Log out</button>
          </div>
        )}
        {!user && (
          <div className='flex gap-3'>
            <Link to = "/login">Login</Link>
            <Link to = "/signup">SignUp</Link>
          </div>
        )}
      </div>
    </nav>  
  )
}

export default Navbar