import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../style";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IntervalBox, IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer } from "./style";
import { useForm } from "react-hook-form";
import { z } from "zod";


const TimeIntervalsFormSchema = z.object({
  
})

/*
  We have many week days inside our form, and each day of the week is a position in an array, so let's say we want each
  day of the week to be inside of the array and when it's submitted we want it to be like

  [
    {day: 0, start: time, end: time },
    {day: 1, start: time, end: time },
    {day: 2, start: time, end: time },
    {day: 3, start: time, end: time },
    {day: 4, start: time, end: time },
    {day: 5, start: time, end: time }
    {day: 6, start: time, end: time }
  ]

  in rhf, we call this, fieldArray, that is a field inside our form, which is an array. So we'll do as follows
*/

export default function TimeIntervals() {
  const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm()

  async function handleSetTimeInterval() {

  }

  // const { data: session, status } = useSession()

  // const router = useRouter();

  // const isSignedIn = status === 'authenticated'

  // const hasAuthError = !!router.query.error;


  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá!</Heading>
        <Text>Defina o intervalo de horários que você está disponível em cada dia da semana</Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeInterval)}> 
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput
                size={'sm'}
                type="time"
                step={60}
              />
              <TextInput
                size={'sm'}
                type="time"
                step={60}
              />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>

        <Button
        type="submit"
        >
          Proximo Passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}