import express from 'express'
import * as postController from '../controllers/post.controller'
import { validate } from '../middleware/validate.middleware'
import { createPostSchema } from '../schemas/post.schema'
import { authenticateUser } from '../middleware/authenticate.middleware'

const postRouter = express.Router()

postRouter.get('/' , postController.getAllPosts)
postRouter.get('/:postId' , postController.getPost)
postRouter.delete('/:postId' , authenticateUser , postController.deletePost)
postRouter.get('/user/list' , authenticateUser , postController.getUserPosts)
postRouter.post('/:postId' , authenticateUser ,  postController.publishPost)
postRouter.put('/:postId' , authenticateUser ,  validate(createPostSchema) , postController.updatePost)
postRouter.post('/' , authenticateUser ,  validate(createPostSchema) , postController.createPost)

export default postRouter