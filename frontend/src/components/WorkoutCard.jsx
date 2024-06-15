import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { formatDistanceToNow } from "date-fns"
import {useAuthContext} from "../hooks/useAuthContext"

const WorkoutCard = ({_id , title, load, reps, createdAt}) => {
  const {dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  const handleClick = async () => {
    if(!user) {
      return 
    }

    const response = await fetch(`/api/workouts/${_id}`,{
      method : "DELETE",
      headers : {
        "Authorization" : `Bearer ${user.token}`
      }
    })

    const data = await response.json()
    
    if(response.ok) {
      dispatch({type : "DELETE_WORKOUT", payload : data})
    }
  }

  return (
    <div className='leading-7 px-6 py-4 max-w-4xl m-auto my-3 bg-white rounded-lg shadow-md flex justify-between'>
      <div>
        <h3 className='text-2xl text-green-400 font-bold mb-4'>{title}</h3>
        <p className='text-gray-800 font-bold'>Load (kg) : {load}</p>
        <p className='text-gray-800 font-bold'>Reps : {reps} </p>
        <p className='text-gray-500'>{formatDistanceToNow(new Date(createdAt), {addSuffix : true})}</p>
      </div>
      <div>
        <button onClick={handleClick} className='uppercase text-gray-600 bg-slate-100 px-2 py-2 rounded-full'>
          <img src="https://img.icons8.com/?size=100&id=85081&format=png&color=000000" alt="delete" width={20} height={20}/>
        </button>
      </div>
    </div>
  )
}

export default WorkoutCard