import express from 'express'
import { Request , Response , NextFunction } from 'express'
import morgan from 'morgan'
import userRouter from './routers/user.routes'
import postRouter from './routers/post.routes'
import { HttpError } from './errors/http.error'

const app = express()
const port = 8080

app.use(morgan('dev'))
app.use(express.json())

app.get('/' , (req , resp , next) => {
  resp.send('Server Responds successfully')
})

app.use('/users' , userRouter)

app.use('/posts' , postRouter)

app.use((err:Error , req:Request , resp:Response , next: NextFunction) => {
  if(err instanceof HttpError){
    resp.status(err.statusCode).json({message: err.message})
  }
  else{
    resp.status(500).json({message: err.message})
  }
})

app.listen(port , () => {
  console.log('Server loaded on port 8080 successfully')
})

export default app