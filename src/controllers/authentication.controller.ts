import type { Request , Response , NextFunction } from "express"
import * as authService from '../services/auth.service'

export const userLogin = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const {newAccessToken , newRefreshToken} = await authService.userLogin(req.body.username , req.body.password)

    resp.cookie("refreshToken" , newRefreshToken ,{
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7*24*60*60*1000
    }).status(200)
      .json({accessToken: newAccessToken})
  }
  catch(err){
    next(err)
  }
}

export const refreshAccessToken = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const {tokenId , token} = req.cookies.refreshToken

    const newAccessToken: string = await authService.renewAccessToken(tokenId , token)

    const newRefreshToken = await authService.renewRefreshToken(tokenId , token)

    resp.cookie("refreshToken" , newRefreshToken ,{
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7*24*60*60*1000
    }).status(200)
      .json({accessToken: newAccessToken})

  } catch(err) {
    next(err)
  }
}

export const signout = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const {tokenId , token} = req.cookies.refreshToken

    authService.revokeRefreshToken(tokenId)

    resp.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    }).status(200)
      .json({message: "User Signed Out Successfully"})
      
  } catch(err) {
    next(err)
  }
}