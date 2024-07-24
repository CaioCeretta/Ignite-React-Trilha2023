import { z } from 'zod'

const envSchema = z.object({
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional()
})

export const env = envSchema.parse(process.env)
