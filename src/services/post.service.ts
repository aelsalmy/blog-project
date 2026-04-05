import { HttpError } from "../errors/http.error"
import { Post } from "../models/post.model"
import { checkIfUserExists } from "./user.service"

let postMemory: Post[] = []

export const createPost = (userId: number , content: string) => {

  if(!checkIfUserExists(userId)){
    throw new HttpError(400 , 'User Does not Exist')
  }

  const newPost:Post = {
    userId: userId,
    content: content,
    postId: postMemory.length == 0? 0: postMemory[postMemory.length -1].postId + 1,
    published: false
  }

  postMemory.push(newPost)

  return newPost
}

export const getAllPosts = () =>{
  return postMemory
}

export const getPost = (postId: Number) => {
  const post:Post|undefined = postMemory.find(post => post.postId == postId)

  if(!post){
    throw new HttpError(404 , 'Post does not exist')
  }

  return post
}

export const updatePost = (postId: number , userId:number , content: string) => {

  const postIdx:number = postMemory.findIndex(post => post.postId == postId)

  if(postIdx == -1){
    throw new HttpError(404 , 'Post does not exist')
  }

  if(userId != postMemory[postIdx].postId){
    throw new HttpError(401 , 'You dont have access to update post')
  }

  postMemory[postIdx].content = content

  return postMemory[postIdx]
}

export const deletePost = (postId: number) => {
  const post:Post|undefined = postMemory.find(post => post.postId == postId)

  if(!post){
    throw new HttpError(400 , 'Post does not exist')
  }

  postMemory = postMemory.filter(post => post.postId != postId)

  return post
}

export const publishPost = (postId: number , userId: number) => {
  const postIdx:number|undefined = postMemory.findIndex(post => post.postId == postId)

  if(postIdx == -1){
    throw new HttpError(404 , 'Post does not exist')
  }

  if(userId !== postMemory[postIdx].userId){
    throw new HttpError(401 , 'You dont have access to publish post')
  }

  postMemory[postIdx].published = true
  
  return postMemory[postIdx]
}

export const findUserPosts = (userId: number) => {

  if(!checkIfUserExists(userId)){
    throw new HttpError(400 , 'User does not exist')
  }

  const userPosts = postMemory.filter(post => post.userId == userId)

  return userPosts
}