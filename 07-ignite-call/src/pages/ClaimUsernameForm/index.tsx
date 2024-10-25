import { ArrowRight } from 'phosphor-react'

import { Button, TextInput } from "@ignite-ui/react";
import { Form } from "./style";


export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput
        size={'sm'}
        prefix="ignite.com/"
        placeholder="Seu Usuário"
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