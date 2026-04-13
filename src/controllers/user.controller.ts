import type { Request , Response , NextFunction } from "express"
import * as userService from '../services/user.service'
import { User, UserProfile } from "@prisma/client"
import { AuthRequest } from "../middleware/authenticate.middleware"

export const createUser = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const {username , email , password , profile} = req.body

    const newUser = await userService.createUser(username , email , password , profile)

    resp.status(201).json({message: "User Created Successfully"})
  }
  catch(err){
    next(err)
  }
}

export const getUserProfile = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const userId: number = (req as AuthRequest).userId

    const userProfile: UserProfile = await userService.getUserProfile(userId)

    resp.status(200).json(userProfile)
  }
  catch(err){
    next(err)
  }
}

export const updateUserProfile = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const userId: number = (req as AuthRequest).userId
    const {profession , country , city} = req.body

    const updatedUser = await userService.updateUserProfile(userId , profession,  country , city)

    resp.status(200).json(updatedUser)
  }
  catch(err){
    next(err)
  }
}