import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../style";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IntervalBox, IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer, FormError } from "./style";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "../../../utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";


const TimeIntervalsFormSchema = z.object({
  /* 
  The only content this form is going to receive is the values of the day, that are based on the intervals object which 
  is an array of objects defined on the defaultValues, the length of this array will be seven, because we'll always
  receive all days of the week, enabled or disabled, and at the end we'll transform the value, we will modify the shape of
  the original array. One other thing we'll do is use another property from zod named refined, refined returns true or false,
  in this case, if the array is valid or not, it will receive the array returned by transform, and inside of it, we return
  a true or false, this will be useful if we want to disable the form in case no days are enabled. So it will be like this.
  */
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string()

  }),
  ).length(7)
  .transform(intervals => intervals.filter(interval => interval.enabled))
  .refine(intervals => intervals.length > 0, {
    message: 'Você precisa selecionar ao menos um dia na semana.'
  })
})

type TimeIntervalsFormData = z.infer<typeof TimeIntervalsFormSchema>

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
  const { register, handleSubmit, formState: { isSubmitting, errors }, control, watch } = useForm(
    {
      resolver: zodResolver(TimeIntervalsFormSchema),
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

  const intervals = watch('intervals')

  const weekDays = getWeekDays()



  async function handleSetTimeInterval(data: TimeIntervalsFormData) {
    console.log(data)
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
                {/* We only can use html register on native html elements, Checkbox is not one, so we cannot use useForm
                register right here, we need to make this a controlled component, a controller is used when we have any
                element on screen, that will insert something on the form, but it's not native from html */}
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => {
                    /*
                      Checkbox component explanation

                      1 - We have he property onCheckedChange, this is a property that will be called whenever we click to
                      change the value of the checkbox, and one property the function receives is the checked that we'll use
                      if the controlled field changed, whether is checked or uncheded, we will change the property and
                      talk with the hook form
                      2 - The reason we didn't simply pass the checked, but checked === true, is because on radix-ui, it
                      can be a boolean or a string 'indeterminate', indeterminate is important for typescript, because
                      let's think we have a checkbox on the screen, it rendered on the screen but the user never handled
                      its value, and we don't know if it's true or false. So there is a third state that radix calls 'indeterminate'
                      that state is because we can't determine what will be the user choice, it's not true nor false.
                      Then here we are doing a rule, if the checkbox checked is true, the user really clicked on it, then
                      it will apply the value as true, otherwise it's false.
                      3 - We'll also set the checked from the Checkbox as the field value so we can retrieve its value.
                      This will be useful for us to retrieve the initial value we used as default

                    */
                    return <Checkbox
                      onCheckedChange={checked => {
                        field.onChange(checked === true)
                      }}
                      checked={field.value}
                    />
                  }}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size={'sm'}
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                  disabled={intervals[index].enabled === false}
                />
                <TextInput
                  size={'sm'}
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                  disabled={intervals[index].enabled === false}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.message}</FormError>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Proximo Passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}