import express from 'express'
import * as userController from '../controllers/user.controller'
import { createUserSchema, userLoginSchema } from '../schemas/user.schema'
import { validate } from '../middleware/validate.middleware'

const userRouter = express.Router()

userRouter.post('/' , validate(createUserSchema) , userController.createUser)

userRouter.post('/login' , validate(userLoginSchema) , userController.userLogin)

export default userRouter