import express from 'express'
import * as postController from '../controllers/post.controller'
import { validate } from '../middleware/validate.middleware'
import { createPostSchema } from '../schemas/post.schema'

const postRouter = express.Router()

postRouter.get('/' , postController.getAllPosts)
postRouter.get('/:postId' , postController.getPost)
postRouter.delete('/:postId' , postController.deletePost)
postRouter.get('/user/:userId' , postController.getUserPosts)
postRouter.post('/:postId' , postController.publishPost)
postRouter.put('/:postId' , validate(createPostSchema) , postController.updatePost)
postRouter.post('/' , validate(createPostSchema) , postController.createPost)

export default postRouter