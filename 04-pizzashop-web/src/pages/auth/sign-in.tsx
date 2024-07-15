import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { signIn } from '@/api/signin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    authenticate({ email: data.email })

    toast.success('We sent you an authentication link', {
      action: {
        label: 'Resend',
        onClick: () => handleSignIn(data),
      },
    })
  }

  return (
    <>
      <Helmet title="Sign In" />
      <div className="p-8">
        <Button variant={'ghost'} asChild className="absolute right-4 top-8">
          <Link to={'/auth/signup'}>New Establishment</Link>
        </Button>

        <div className="flex w-[350px] flex-col items-center justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-medium tracking-tight">
              Access the dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Keep track of your orders at the partner dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
