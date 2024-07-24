import { env } from '@/env'
import Stripe from 'stripe'

console.log(env.STRIPE_SECRET_KEY)

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  appInfo: {
    name: 'Ignite Shop'
  }
})