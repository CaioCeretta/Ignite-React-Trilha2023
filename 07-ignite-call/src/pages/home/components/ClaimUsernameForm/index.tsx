import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ArrowRight } from 'phosphor-react'

import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./style";
import { z } from 'zod';
import { useRouter } from 'next/router';

const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hifens' })
    .transform(username => username.toLowerCase())
})

type ClaimUsernameFormType = z.infer<typeof claimUsernameFormSchema>


export function ClaimUsernameForm() {

  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUsernameFormType>({
    resolver: zodResolver(claimUsernameFormSchema)
  })


  async function handleClaimUsername(data: ClaimUsernameFormType) {
    const { username } = data
    
    await router.push(`/register?username=${username}`)
  }

  return (
    <>
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
          disabled={isSubmitting}
        >
          Reservar usuário
          <ArrowRight />
        </Button>

      </Form>
      <FormAnnotation>
        <Text size="sm">{errors.username
          ? errors.username.message
          : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}