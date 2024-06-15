import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";

const userSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
   
  }
}, {timestamps : true})

userSchema.statics.signup = async function(email, password) {

  if(!email || !password) {
    throw Error("All fields are require *")
  }
  if(!validator.isEmail(email)) {
    throw Error("Email is not valid")
  }
  if(!validator.isStrongPassword(password)) {
    throw Error("Enter a strong password")
  }

  const exist = await this.findOne({email})
  if(exist) {
    throw Error("User already exist")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = this.create({email, password : hash})

  return user
}

userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error("All fields are require *")
  }
  const user = await this.findOne({email})
  if(!user) {
    throw Error("Invalid credentials")
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    throw Error("Invalid credentials")
  }
  return user
}



export const User = mongoose.model("User", userSchema)