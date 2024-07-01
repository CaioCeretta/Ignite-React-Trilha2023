import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()

  async function handleSignIn(data: SignInForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000))

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
              <Label>Your E-mail</Label>
              <Input {...register('email')}></Input>
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
