import { useForm } from 'react-hook-form'

import { ArrowRight } from 'phosphor-react'

import { Button, TextInput } from "@ignite-ui/react";
import { Form } from "./style";
import { z } from 'zod';


export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormType>()

  const claimUsernameFormSchema = z.object({
    username: z.string()
  })

  type ClaimUsernameFormType = z.infer<typeof claimUsernameFormSchema>

  async function handleClaimUsername(data: ClaimUsernameFormType) {
    console.log(data.username)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size={'sm'}
        prefix="ignite.com/"
        placeholder="Seu Usuário"
        {...register('username')}
      />
      <Button
        size={'sm'}
        type="submit"
      >
        Reservar usuário
        <ArrowRight />
      </Button>
    </Form>
  )
}