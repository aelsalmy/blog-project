import type { Request , Response , NextFunction } from "express"
import { AuthRequest } from "../middleware/authenticate.middleware"
import * as postService from '../services/post.service'

export const createPost = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const userId: number = (req as AuthRequest).userId

    const newPost = await postService.createPost(userId , req.body.content)

    resp.status(201).json(newPost)
  }
  catch(err){
    next(err)
  }
}

export const getAllPosts = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const allPosts = await postService.getAllPosts()

    resp.status(200).json(allPosts)
  }
  catch(err){
    next(err)
  }
}

export const getPost = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const postId = Number(req.params.postId)

    const post = await postService.getPost(postId)
    
    resp.status(200).json(post)
  }
  catch(err:any){
    next(err)
  }
}

export const updatePost = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const {content} = req.body
    const userId: number = (req as AuthRequest).userId
    const postId: number = Number(req.params.postId)

    const updatedPost = await postService.updatePost(postId , userId , content)

    resp.status(200).json(updatedPost)
  }
  catch(err){
    next(err)
  }
}

export const deletePost = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const postId:number = Number(req.params.postId)
    const userId: number = (req as AuthRequest).userId

    const deletedPost = await postService.deletePost(postId , userId)

    resp.status(200).json(deletedPost)
  }
  catch(err){
    next(err)
  }
}

export const publishPost = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const postId = Number(req.params.postId)
    const userId: number = (req as AuthRequest).userId

    const publishedPost = await postService.publishPost(postId , userId)

    resp.status(200).json(publishedPost)
  }
  catch(err){
    next(err)
  }
}

export const getUserPosts = async (req:Request , resp:Response , next:NextFunction) => {
  try{
    const userId: number = (req as AuthRequest).userId

    const userPosts = await postService.findUserPosts(userId)

    resp.status(200).json(userPosts)
  }
  catch(err){
    next(err)
  }
}