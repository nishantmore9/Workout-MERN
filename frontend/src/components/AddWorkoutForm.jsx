import { useWorkoutContext } from '../hooks/useWorkoutContext'
import React, { useState } from 'react'
import {useAuthContext} from "../hooks/useAuthContext"

const AddWorkoutForm = () => {
  const {dispatch} = useWorkoutContext()
  const [title, setTitile] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()

  const handleSubmit = async(e) => {
    
    e.preventDefault()

    if(!user) {
      setError("You are not Logged in")
      return 
    }

    const workout = {title, load, reps}

    const response = await fetch("/api/workouts",{
      method : "POST",
      body : JSON.stringify(workout),
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setEmptyFields(data.emptyFields)
    }
    if(response.ok) {
      setTitile('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      console.log(`New workout added ${data}`)
      dispatch({type: "CREATE_WORKOUT", payload : data})
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 min-w-4xl px-6 py-8 my-3 bg-white rounded-lg shadow-md'>
      <h3 className='text-2xl font-bold'>Add a New Workout</h3>
      <label>Exercise title:</label>
      <input 
        type='text'
        value={title}
        onChange={(e) => setTitile(e.target.value)}
        className={emptyFields.includes("title") ? 'border-red-500 border-2 bg-white p-2 rounded-lg':'border-none bg-slate-100 p-2 rounded-lg'}
      />
      <label>Load (in Kg):</label>
      <input 
        type='number'
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? 'border-red-500 border-2 bg-white p-2 rounded-lg' :'border-none bg-slate-100 p-2 rounded-lg'}
      />
      <label>Reps:</label>
      <input 
        type='number'
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? 'border-red-500 border-2 bg-white p-2 rounded-lg' :'border-none bg-slate-100 p-2 rounded-lg'}
      />

      <button className='bg-green-400 text-white font-bold px-2 py-2 rounded-lg mt-5'>Add Workout</button>
      {error && <div className='border-red-500 bg-red-50 border-2 text-red-500 px-4 py-1'>{error}</div>}
    </form>
  )
}

export default AddWorkoutForm