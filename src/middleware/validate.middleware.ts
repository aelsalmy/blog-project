import * as z from 'zod'
import { Request , Response , NextFunction } from 'express'

export const validate = 
  <T>(schema: z.ZodType<T>) => 
    (req: Request , resp:Response , next:NextFunction) => {

      const result = schema.safeParse(req.body)

      if(!result.success){
        return resp.status(400).json({success: false , errors: result.error.issues})
      }

      next()
    }