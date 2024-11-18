import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import type { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { Container, FormError, Header } from '../style'
import { FormAnnotation, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  const router = useRouter()

  const { data: session } = useSession()

  console.log(session)

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Atualize o seu perfil | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Bem vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil. Ah, você
            pode editar essas informações depois
          </Text>
          <MultiStep size={4} currentStep={3} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            {/* On the client side, we could have a cors problem, so loading the avatar from an external source, would result
        in a problem of this type, but because we are loading the session from the server side, we don't have this type of
        problem, because on the server side, cors wouldn't be applied, only in requests made by requests made from the
        browser  */}
            <Avatar src={session?.user.avatar_url} alt={session?.user.name} />
          </label>
          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
            <FormAnnotation size={'sm'}>
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>

            {errors.bio && <FormError>{errors.bio.message}</FormError>}
          </label>
          <Button type="submit">
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

/*
  Session explanation

  If we want to get the session information, we need to use the hook useSession from next, and by consoling log the data
  returned by this function, it would show us all the informations about the session.
  But we need to take a look at one point, we can see the console.log() happenned more than one time, and that's fine for
  "cheap" operations, and because we have hooks inside of the file, those hooks will cause the component to re render.
  
  The first console.log, will say that the data of the session is undefined and the status is loading, because in the first
  moment the session is being fetches, the information still isn't available for us, because we can see on the dev tools
  that the only information we have about the user, is a token of the session, but it does not necessarily brings to us,
  informations about the user, we don't have user information on the cookies, they are stored in our session but on the
  server side part of next because it can retrieve from the database.
  
  For the front-end to be able to know informations about the user, he needs to go on the backend as ask for those infos.
  By going to the network of our dev tools, we'll see that a session request is being made.

  So basically Next under the hood is making a request of the front end to the backend, asking for informations about the
  logged user by sending the next auth token we have on the cookies, so now the backend returns data about the logged user,
  this will take a certain time to fetch the data, so locally or remotely, there'll always be a delay in which, the user
  session is still not available in the client side of our application, it always needs to be loaded assynchronally for us.

  So for us to load this data as soon as the component renders, we'll utilize the GetServerSideProps function to this

  One thing to notice is that, if we remember we enclosed our whole project on a SessionProvider, in this component, we
  are passing to it a session that is comming from the pageProps, and pageProps is everything that we return from the
  getServerSideProps, but by default, in all the pages, that session is undefined, because we don't have in any pages, the
  getServerSideProps returning this session. That's why in any components, the session will always be undefined, so NextAuth
  will only load a session in the moment we use the useSession

  In the time intervals file, inside the api, we used a similar function, we used the
  session = await getServerSession(req, res, buildNextAuthOptions(req, res)) and because this function is server side, and
  inside the update profile, whatever we put on the getServerSide such as something

  return { props: { session: { oi: 'teste' } } }
  
  we wil see that the initial value of the session is oi: teste, so because anything on the getServerSideProps is also server
  sided, we can use the same function of loading the session inside of here.
*/

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  /* If we simply do like this, it will returns us an error, that's because the req and res of the buildNextAuthOptions
  function receives a NextApiRequest and a NextApiResponse, and these req and res are not of that type, so some infos are
  not equal in both objects, so we'll change the typing on that function construction so it will be ApiRequest or PageContext['req']
  and the same for the response

  Now by doing this we just did on creating a session and returning it as props, the page will be loaded with the session
  already defined
  
  */

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
