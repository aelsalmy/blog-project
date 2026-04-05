import type { Request , Response , NextFunction } from "express"
import * as userService from '../services/user.service'
import { User } from "../models/user.model"

export const createUser = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const {username , email , password , profile} = req.body

    const newUser = userService.createUser(username , email , password , profile)

    resp.status(200).json({message: "User Created Successfully" , user: newUser})
  }
  catch(err:any){
    next(err)
  }
}

export const userLogin = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const user = userService.userLogin(req.body.username , req.body.password)

    resp.status(200).json(user)
  }
  catch(err:any){
    next(err)
  }
}

export const getUserProfile = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const userId: number = Number(req.params.userId)

    const user: User = userService.getUserProfile(userId)

    resp.status(200).json(user)
  }
  catch(err){
    next(err)
  }
}

export const updateUserProfile = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const userId: number = Number(req.params.userId)
    const {profession , country , city} = req.body

    const updatedUser = userService.updateUserProfile(userId , profession,  country , city)

    resp.status(200).json(updatedUser)
  }
  catch(err){
    next(err)
  }
}