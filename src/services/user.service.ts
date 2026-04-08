import { HttpError } from "../errors/http.error"
import bcrypt from 'bcrypt';
import prisma from "../utils/prisma.client"
import { User, UserProfile } from "@prisma/client";

const saltRounds = 12

export async function createUser(username: string , email: string , password: string , profile: UserProfile){

  const dupUsers = await prisma.user.findFirst({
    where: {
      OR: [
        {username: username},
        {email: email}
      ]
    }
  })

  if(dupUsers && dupUsers.email === email){
    throw new HttpError(400 , 'Email Already registered to an account') 
  }

  if(dupUsers && dupUsers.username === username){
    throw new HttpError(400 , 'Username Already Taken') 
  }

  const hashedPassword = await bcrypt.hash(password , saltRounds)

  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword 
    }
  })

  const newProfile = await prisma.userProfile.create({
    data: {
      profession: profile.profession,
      city: profile.city,
      country: profile.country,
      userId: newUser.id
    }
  })
  
  return stripPassword(newUser)
}

export async function checkIfUserExists(userId:number){
  const user = await prisma.user.findFirst({
    where: {id: userId}
  })
  
  if(user){
    return true 
  }
  return false
}

export async function getUserProfile(userId: number){
  const userProfile = await prisma.userProfile.findFirst({
    where: {userId: userId}
  })

  if(!userProfile){
    throw new HttpError(404 , 'User does not exist')
  }

  return userProfile
}

export async function updateUserProfile(userId: number , profession: string , country: string , city: string){
  const userProfile = await prisma.userProfile.updateMany({
    where: {userId: userId},
    data: {
      profession: profession,
      city: city,
      country: country
    }
  })

  if(!userProfile.count){
    throw new HttpError(404 , 'User does not exist')
  }

  const user: User|null = await prisma.user.findFirst({
    where: {id: userId},
    include: {userProfile: true}
  })

  return stripPassword(user)
}

function stripPassword(user:User|null){
  if(!user)
    return null

  const {password , ...safeUser} = user

  return safeUser
}

