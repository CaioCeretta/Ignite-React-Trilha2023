import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Resturant was successfully registered', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/auth/signin?email=${data.email}`),
        },
      })
    } catch {
      toast.error('Error during the restaurant register')
    }
  }

  return (
    <>
      <Helmet title="'Register'" />
      <div className="p-8">
        <Button variant={'ghost'} asChild className="absolute right-4 top-8">
          <Link to={'/auth/signin'}>Sign In</Link>
        </Button>
        <div className="flex w-[350px] flex-col items-center justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-medium tracking-tight">
              Create Free Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Become a partner and begin to sell!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                type="text"
                id="restaurantName"
                {...register('restaurantName')}
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="restaurantName">Manager Name</Label>
              <Input
                type="text"
                id="managerName"
                {...register('managerName')}
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone nº</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your e-mail</Label>
              <Input type="text" id="email" {...register('email')}></Input>
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finish Register
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="" className="underline underline-offset-4">
                terms of service
              </a>{' '}
              and{' '}
              <a href="" className="underline underline-offset-4">
                privacy policies
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
