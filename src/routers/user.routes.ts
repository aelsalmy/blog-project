import express from 'express'
import * as userController from '../controllers/user.controller'
import { createUserSchema, userLoginSchema , userProfileSchema} from '../schemas/user.schema'
import { validate } from '../middleware/validate.middleware'
import { authenticateUser } from '../middleware/authenticate.middleware'

const userRouter = express.Router()

userRouter.post('/' , validate(createUserSchema) , userController.createUser)
userRouter.put('/' , validate(userProfileSchema) , userController.updateUserProfile)
userRouter.get('/' , authenticateUser , userController.getUserProfile)


export default userRouter