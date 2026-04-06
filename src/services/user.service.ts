import { User, UserProfile } from "../models/user.model"
import { HttpError } from "../errors/http.error"

type UserPublic = Omit<User , 'password'>

let usersMemory: User[] = []

export function createUser(username: string , email: string , password: string , profile: UserProfile){

  if(usersMemory.find(user => user.username === username)){
    throw new HttpError(400 , 'Username Already Taken') 
  }

  if(usersMemory.find(user => user.email === email)){
    throw new HttpError(400 , 'Email Already registered to an account') 
  }

  const newUser: User = {
    userId: usersMemory.length == 0? 0: usersMemory[usersMemory.length -1].userId + 1,
    username: username,
    email: email,
    password: password,
    profile: profile
  }

  usersMemory.push(newUser)
  
  return stripPassword(newUser)
}

export function userLogin(username: string , password: string){
  const user = usersMemory.find(user => user.username === username)

  if(!user){
    throw new HttpError(400 , 'Invalid Credentials')
  }

  if(user.password !== password){
    throw new HttpError(400 , 'Invalid Credentials')
  }

  return stripPassword(user)
}

export function checkIfUserExists(userId:number){
  if(usersMemory.find(user => user.userId === userId)){
    return true 
  }
  return false
}

export function getUserProfile(userId: number){
  const user = usersMemory.find(user => user.userId === userId)

  if(!user){
    throw new HttpError(404 , 'User does not exist')
  }

  return user
}

export function updateUserProfile(userId: number , profession: string , country: string , city: string){
  const userIdx:number =  usersMemory.findIndex(user => user.userId === userId)

  if(userIdx == -1){
    throw new HttpError(404 , 'User does not exist')
  }

  usersMemory[userIdx].profile = {
    profession: profession,
    city: city,
    country: country
  }

  return usersMemory[userIdx]
}

function stripPassword(user:User){

  const {password , ...safeUser} = user

  return safeUser
}