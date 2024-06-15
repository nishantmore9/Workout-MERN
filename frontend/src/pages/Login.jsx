import React, {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, loading} = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 px-6 py-8 my-3 m-auto bg-white rounded-lg shadow-md max-w-md'>
      <h3 className='text-2xl font-bold'>Log In</h3>
      <label>Email :</label>
      <input 
        type="text" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border-none bg-slate-100 p-2 rounded-lg'
      />
      <label>Password :</label>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border-none bg-slate-100 p-2 rounded-lg'
      />
      <button disabled={loading} className='bg-green-400 text-white font-bold px-2 py-2 rounded-lg mt-5 uppercase'>Log In</button>
      {error && <div className='border-red-500 bg-red-50 border-2 text-red-500 px-4 py-1'>{error}</div>}
    </form>
  )
}

export default Login