import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const signup = async(email, password) => {
    setLoading(true)
    setError(null)
    const response = await fetch("/api/user/signup",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({email, password})
    })
    const data = await response.json()

    if (!response.ok) {
      setLoading(false)
      setError(data.error)
    }
    if(response.ok) {
      localStorage.setItem("user", JSON.stringify(data))
      dispatch({type : "LOGIN", payload: data})
    }
  }

  return {signup, loading, error}
}