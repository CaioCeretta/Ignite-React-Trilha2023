import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormHeader } from './style'

export function ConfirmStep() {
  function handleConfirmScheduling() {
    // todo
  }

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          20 de Novembro de 2024
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text>Nome completo</Text>
        <TextInput placeholder="Seu nome"></TextInput>
      </label>

      <label>
        <Text>Endereço de e-mail</Text>
        <TextInput placeholder="johndoe@example.com"></TextInput>
      </label>

      <label>
        <Text>Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
