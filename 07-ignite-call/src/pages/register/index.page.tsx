import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./style";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";

const registerFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hifens' })
    .transform(username => username.toLowerCase()),
  fullname: z.string().min(3, { message: 'O nome precisa ter pelo menos três letras' })
})

type RegisterFormType = z.infer<typeof registerFormSchema>

export default function Register() {
  const router = useRouter();


 
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: 'caioceretta'
    }
  });

  useEffect(() => {

    if(router.query.username) {
      setValue('username', String(router.query.username))
    }

  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormType) {
    try {
      await api.post('/users', {
        fullname: data.fullname,
        username: data.username
      })

      await router.push(`/register/connect-calendar`)
    } catch (err) {
      if(err instanceof AxiosError && err?.response?.data.message) {
        alert(err.response.data.message)
        return;
      }

      console.error(err)
    
    }
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