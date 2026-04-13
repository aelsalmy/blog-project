import express from 'express'
import { userLoginSchema } from '../schemas/user.schema'
import { validate } from '../middleware/validate.middleware'
import * as authController from '../controllers/authentication.controller'

const authRouter = express.Router()

authRouter.post('/login' , validate(userLoginSchema) , authController.userLogin)
authRouter.post('/token' , authController.refreshAccessToken)
authRouter.post('/signout' , authController.signout)

export default authRouter