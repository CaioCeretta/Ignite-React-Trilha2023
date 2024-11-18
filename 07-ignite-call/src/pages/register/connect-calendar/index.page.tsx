import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../style'
import { AuthError, ConnectBox, ConnectItem } from './style'

export default function ConnectCalendar() {
  const { data: session, status } = useSession()

  const router = useRouter()

  const isSignedIn = status === 'authenticated'

  const hasAuthError = !!router.query.error

  /* One option is to avoid creating in line arrow functions and create separate functions, instead of writing
  onClick={() => signIn()}, create a separate function such as handleSignin and just invoke it as onClick={signIn} */

  async function handleConnectCalendar() {
    await signIn()
  }

  async function handleNavigateToNextStep() {
    await router.push(`/register/time-intervals`)
  }

  console.log(session)

  return (
    <>
      <NextSeo title="Conecte a sua agenda do Google | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                onClick={handleConnectCalendar}
                variant={'secondary'}
                size="sm"
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            onClick={handleNavigateToNextStep}
            disabled={!isSignedIn}
            type="submit"
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
