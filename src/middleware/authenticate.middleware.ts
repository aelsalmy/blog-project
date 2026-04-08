import { Response , Request , NextFunction } from "express";
import * as authService from '../services/auth.service'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface AuthRequest extends Request {
    userId: number;
}

export const authenticateUser = (req: Request , resp: Response , next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return resp.status(401).json({ message: "No token provided" });
  }

  const accessToken:string = authHeader.split(" ")[1]

  try{
    const decodedToken = jwt.verify(accessToken , process.env.JWT_SECRET!) as JwtPayload;

    (req as AuthRequest).userId = decodedToken.userId

    next()
  }
  catch(err){
    next(err)
  }
}