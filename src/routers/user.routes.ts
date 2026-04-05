import express from 'express'
import * as userController from '../controllers/user.controller'
import { createUserSchema, userLoginSchema , userProfileSchema} from '../schemas/user.schema'
import { validate } from '../middleware/validate.middleware'

const userRouter = express.Router()

userRouter.post('/' , validate(createUserSchema) , userController.createUser)
userRouter.post('/login' , validate(userLoginSchema) , userController.userLogin)
userRouter.put('/:userId' , validate(userProfileSchema) , userController.updateUserProfile)
userRouter.get('/:userId' , userController.getUserProfile)


export default userRouter