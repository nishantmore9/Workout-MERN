import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import workoutRoutes from "./routes/workout.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express()
dotenv.config()

//middlewares
app.use(express.json())
app.use(cors({credentials: true, origin:"http://localhost:3000"}))
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//Routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Mongo DB connected and server started at port ${process.env.PORT || 3000}`)
    })
  })
  .catch((error) => { console.log(`Error : ${error.message}`)})

