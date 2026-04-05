import type { Request , Response , NextFunction } from "express"
import * as userService from '../services/user.service'

export const createUser = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const newUser = userService.createUser(req.body.username , req.body.email , req.body.password)

    resp.status(200).json({message: "User Created Successfully"})
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