import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./style";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hifens' })
    .transform(username => username.toLowerCase()),
  fullname: z.string().min(3, { message: 'O nome precisa ter pelo menos três letras' })
})

type RegisterFormType = z.infer<typeof registerFormSchema>

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema)
  });

  async function handleRegister(data: RegisterFormType) {
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">
          Bem vindo ao Ignite Call!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil.
          Ah, você pode editar essas informações depois
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de Usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuario" {...register('username')} />
          {errors.username &&
            <FormError>
              {errors.username.message}
            </FormError>
          }

        </label>
        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="Seu nome" {...register('fullname')} />
          {errors.fullname &&
            <FormError>
              {errors.fullname.message}
            </FormError>
          }

        </label>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>

      </Form>
    </Container >
  )
}