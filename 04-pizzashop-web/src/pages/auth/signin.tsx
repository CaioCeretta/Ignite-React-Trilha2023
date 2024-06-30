import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignIn() {
  return (
    <>
      <Helmet title="Sign In" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col items-center justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-medium tracking-tight">
              Access the dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Keep track of your orders at the partner dashboard
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Your E-mail</Label>
              <Input></Input>
            </div>

            <Button className="w-full" type="submit">
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
