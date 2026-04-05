import { User } from "../models/user.model"
import { HttpError } from "../errors/http.error"

let usersMemory: User[] = []

export function createUser(username: string , email: string , password: string){

  if(usersMemory.find(user => user.username == username)){
    throw new HttpError(400 , 'Username Already Taken') 
  }

  if(usersMemory.find(user => user.email == email)){
    throw new HttpError(400 , 'Email Already registered to an account') 
  }

  const newUser: User = {
    userId: usersMemory.length == 0? 0: usersMemory[usersMemory.length -1].userId + 1,
    username: username,
    email: email,
    password: password
  }

  usersMemory.push(newUser)
  
  return newUser
}

export function userLogin(username: string , password: string){
  const user = usersMemory.find(user => user.username == username)

  if(!user){
    throw new HttpError(400 , 'Invalid Credentials')
  }

  if(user.password != password){
    throw new HttpError(400 , 'Invalid Credentials')
  }

  return user
}

export function checkIfUserExists(userId:number){
  if(usersMemory.find(user => user.userId == userId)){
    return true 
  }
  return false
}