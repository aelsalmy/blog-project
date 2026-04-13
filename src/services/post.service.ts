import { HttpError } from "../errors/http.error"
import prisma from "../utils/prisma.client"
import { checkIfUserExists } from "./user.service"

export const createPost = async (userId: number , content: string) => {

  if(!await checkIfUserExists(userId)){
    throw new HttpError(400 , 'User Does not Exist')
  }

  const newPost = await prisma.post.create({
    data: {
      userId: userId,
      content: content
    }
  })

  return newPost
}

export const getAllPosts = async (page:number , pageSize: number) =>{
  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {id: 'asc'}
  })

  const total = await prisma.user.count()
 
  return {
    posts,
    total,
    page,
    totalPages: Math.ceil(total / pageSize)
  }
}

export const getPost = async (postId: number) => {
  const post = await prisma.post.findFirst({
    where: {id: postId},
  })

  if(!post){
    throw new HttpError(404 , 'Post does not exist')
  }

  return post
}

export const updatePost = async (postId: number , userId:number , content: string) => {

  const post = await prisma.post.findFirst({
    where: {id: postId}
  })

  if(!post){
    throw new HttpError(404 , 'Post does not exist')
  }

  if(userId != post.userId){
    throw new HttpError(401 , 'You dont have access to update post')
  }

  const updatedPost = await prisma.post.update({
    where: {id: postId},
    data: {
      content: content
    }
  })

  return updatedPost
}

export const deletePost = async (postId: number , userId: number) => {
  const post = await prisma.post.findFirst({
    where: {id: postId}
  })

  if(!post){
    throw new HttpError(404 , 'Post does not exist')
  }

  if(userId !== post.userId){
    throw new HttpError(401 , 'You dont have access to delete post')
  }


  const deletedPost = await prisma.post.delete({
    where:{id: postId}
  })

  return deletedPost
}

export const publishPost = async (postId: number , userId: number) => {

  const post = await prisma.post.findFirst({
    where: {id: postId}
  })

  if(!post){
    throw new HttpError(404 , 'Post does not exist')
  }

  if(userId !== post.userId){
    throw new HttpError(401 , 'You dont have access to publish post')
  }
  

  const updatedPost = await prisma.post.update({
    where: {id: postId},
    data: {
      published: true
    }
  })
  
  return updatedPost
}

export const findUserPosts = async (userId: number) => {

  if(!await checkIfUserExists(userId)){
    throw new HttpError(400 , 'User does not exist')
  }

  const userPosts = await prisma.post.findMany({
    where: {userId: userId}
  })

  return userPosts
}