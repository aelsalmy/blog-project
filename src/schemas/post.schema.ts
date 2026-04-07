import * as z from 'zod'

export const createPostSchema = z.object({
  userId: z.number(),
  content: z.string().min(5)
})