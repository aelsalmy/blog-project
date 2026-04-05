import * as z from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8)
})


export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string()
})
