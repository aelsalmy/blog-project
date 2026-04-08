import prisma from "../utils/prisma.client"
import { HttpError } from "../errors/http.error"
import bcrypt from 'bcrypt';
import { RefreshToken, User } from "@prisma/client";
import crypto from "crypto"
import jwt from 'jsonwebtoken'


export async function userLogin(username: string , password: string){

  const user = await prisma.user.findFirst({
    where: {username: username}
  })

  if(!user){
    throw new HttpError(400 , 'Invalid Credentials 1')
  }

  const matchedPassword = await bcrypt.compare(password , user.password)

  if(!matchedPassword){
    throw new HttpError(400 , 'Invalid Credentials')
  }

  const newRefreshToken = await createRefreshToken(user.id)
  const newAccessToken = await createAccessToken(user.id)

  return {newAccessToken , newRefreshToken}
}

export async function renewRefreshToken(tokenId:number , refreshToken: string){

  const token: RefreshToken = await getRefreshToken(tokenId , refreshToken)

  if(!await validateRefreshToken(tokenId)){
    throw new HttpError(401 , 'Refresh Token Invalid')
  }

  revokeRefreshToken(tokenId)

  return createRefreshToken(token.userId)
}

export async function renewAccessToken(tokenId:number , refreshToken: string){
  const token: RefreshToken = await getRefreshToken(tokenId , refreshToken)

  const newAccessToken = await createAccessToken(token.userId)

  return newAccessToken
}

export async function revokeRefreshToken(tokenId: number) {

  const token = await prisma.refreshToken.update({
    where: {id: tokenId},
    data: {
      isRevoked: true
    }
  })

  return token
}

export async function verifyAccessToken(token: string){
  return jwt.verify(token , process.env.JWT_SECRET!)
}

async function validateRefreshToken(tokenId: number) {

  const token = await prisma.refreshToken.findFirst({
    where: {
      AND: [
        {id: tokenId},
        {isRevoked: false},
        {expiresAt: {
          gt: new Date()
        }}
    ]},
  })

  if(!token){
    return false
  } else {
    return true
  }
}

async function createAccessToken(userId: number) {
  const signedAccessToken = jwt.sign({userId: userId} , process.env.JWT_SECRET! , {
    expiresIn: '15m'
  })

  return signedAccessToken
}

async function getRefreshToken(tokenId:number , refreshToken: string){
  const token = await prisma.refreshToken.findFirst({
    where: {
      AND: [
        {id: tokenId},
        {isRevoked: false},
        {expiresAt: {
          gt: new Date()
        }}
    ]},
  })

  if(!token){
    throw new HttpError(401 , 'Refresh Token not Valid notFound')
  }

  console.log("refreshToken:", refreshToken);
  console.log("tokenHash:", token?.tokenHash);  

  const hashMatching = await bcrypt.compare(refreshToken , token.tokenHash)

  if(!hashMatching){
    throw new HttpError(401 , 'Refresh Token not Valid')
  }

  return token
}

async function createRefreshToken(userId: number){
  const newToken = crypto.randomBytes(64).toString('hex')

  const hashedToken = await bcrypt.hash(newToken , 12)

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const newRefreshToken = await prisma.refreshToken.create({
    data: {
      userId: userId,
      tokenHash: hashedToken,
      expiresAt: expiresAt
    }
  })

  return {tokenId: newRefreshToken.id , token: newToken}
}