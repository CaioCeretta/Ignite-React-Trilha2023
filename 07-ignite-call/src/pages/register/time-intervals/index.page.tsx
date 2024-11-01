import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../style";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IntervalBox, IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer } from "./style";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "../../../utils/get-week-days";


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
  const { register, handleSubmit, formState: { isSubmitting, errors }, control } = useForm(
    {
      /* We want that, when the user enters the form, all the options are available and all the times are set for the
      start and the end of the day*/
      defaultValues: {
        intervals: [
          { weekDay: 0, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
        ]
      }
    }
  )

  /*

  useFieldArray is a hook that allow us to iterate and manipulate a form field that is an array
  
  in our example we are working with week days, so it will be limited to only seven possible values to the field, but if
  we on our daily job is building a form that is handled by the user, and he can add more items, useFieldArray is also
  good in this cases   

  when constructing the useFieldArray object, we pass the name of the field, which is intervals, the name where we used
  for the array on the defaultValues, and control, which we get from useForm, this works for useForm to know which form
  we are talking about. It will return us a fields property and we can simply iterate over each of the fields to show them
  inside
  */
  const { fields } = useFieldArray({
    name: 'intervals',
    control
  })

  const weekDays = getWeekDays()



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
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Checkbox />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size={'sm'}
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}

                />
                <TextInput
                  size={'sm'}
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}

                />
              </IntervalInputs>
            </IntervalItem>
          ))}
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