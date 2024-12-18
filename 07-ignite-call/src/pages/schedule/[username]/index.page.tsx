import { Avatar, Heading, Text } from '@ignite-ui/react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { prisma } from '../../../lib/prisma'
import { ScheduleForm } from './ScheduleForm/index.page'
import { Container, UserHeader } from './style'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatar_url: string
  }
}

export default function Schedule({
  user: { name, bio, avatar_url },
}: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${name} | Ignite Call`} />

      <Container>
        <UserHeader>
          <Avatar src={avatar_url} />
          <Heading>{name}</Heading>
          <Text>{bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    /* This is for when we don't want to generate any static pages on the build moment, but to generate whenever someone
      accesses this page */
    fallback: 'blocking',
    /* Blocking is for pages that still haven't been generated statically, it will search the data from the db, generate
      the static page on the server side, and when it is ready, it will show the page to the client */
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 dia
  }
}
