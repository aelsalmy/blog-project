import * as z from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  profile: z.object({
    profession: z.string().min(1),
    city: z.string().min(2),
    country: z.string().min(3)
  })
})


export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const userProfileSchema = z.object({
    profession: z.string().min(1),
    city: z.string().min(2),
    country: z.string().min(3)
})