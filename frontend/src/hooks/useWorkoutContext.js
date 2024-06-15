import { WorkoutContext } from "../context/WorkOutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext)
  if(!context) {
    throw Error("useWorkoutContext must be used in side WorkoutContextProvider")
  }
  return context
}