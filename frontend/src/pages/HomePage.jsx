import React from 'react'
import { useEffect } from 'react'
import WorkoutCard from '../components/WorkoutCard'
import AddWorkoutForm from '../components/AddWorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import {useAuthContext} from "../hooks/useAuthContext"

const HomePage = () => {
  const {workouts, dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts", {
        headers : {
          "Authorization" : `Bearer ${user.token}`
        }
      })
      const data = await response.json()

      if(response.ok) {
        dispatch({type : "SET_WORKOUT" , payload : data})
      }
    }
    if(user) {
      fetchWorkout()
    }
  }, [dispatch])

  return (
    <div className='p-4 flex justify-around gap-7 max-w-7xl m-auto'>
      <div className='flex-[2]'>
      { workouts && workouts.map((workout) => (
          <WorkoutCard {...workout} key={workout._id}/>
        )
      )}
      </div>
      
      <div className='flex-1'>
        <AddWorkoutForm />
      </div>
     
    </div>
  )
}

export default HomePage