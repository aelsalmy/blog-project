import type { Request , Response , NextFunction } from "express"
import * as postService from '../services/post.service'
import { AnyARecord } from "node:dns"

export const createPost = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const newPost = postService.createPost(req.body.userId , req.body.content)

    resp.status(200).json(newPost)
  }
  catch(err:any){
    next(err)
  }
}

export const getAllPosts = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const allPosts = postService.getAllPosts()

    resp.status(200).json(allPosts)
  }
  catch(err){
    next(err)
  }
}

export const getPost = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const postId = Number(req.params.postId)

    const post = postService.getPost(postId)
    
    resp.status(200).json(post)
  }
  catch(err:any){
    next(err)
  }
}

export const updatePost = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const {userId , content} = req.body
    const postId: number = Number(req.params.postId)

    const updatedPost = postService.updatePost(postId , userId , content)

    resp.status(200).json(updatedPost)
  }
  catch(err){
    next(err)
  }
}

export const deletePost = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const postId:number = Number(req.params.postId)

    const deletedPost = postService.deletePost(postId)

    resp.status(200).json(deletedPost)
  }
  catch(err){
    next(err)
  }
}

export const publishPost = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const postId = Number(req.params.postId)
    const userId = req.body.userId

    const publishedPost = postService.publishPost(postId , userId)

    resp.status(200).json(publishedPost)
  }
  catch(err){
    next(err)
  }
}

export const getUserPosts = (req:Request , resp:Response , next:NextFunction) => {
  try{
    const userId: number = Number(req.params.userId)

    const userPosts = postService.findUserPosts(userId)

    resp.status(200).json(userPosts)
  }
  catch(err){
    next(err)
  }
}