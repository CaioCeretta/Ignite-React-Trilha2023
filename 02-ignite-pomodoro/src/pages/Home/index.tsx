import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutes: number
}

const newCycleFormValidationScheme = zod.object({
  task: zod.string().min(1, 'Please, informate the task'),
  minutesAmount: zod.number().min(5).max(60),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

// When we want to reference a javascript variable inside the typescript, we must always inform that we want the typeof
type NewCycleFormData = zod.infer<typeof newCycleFormValidationScheme>

/* Schema is basically a format, and we are going to validate the form based on this schema, just like we dor with dbs */

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationScheme),
    defaultValues: {
      task: 'dsadasdas',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    // const newCycle: Cycle = {
    //   id: String(new Date().getTime()),
    //   task: data.task,
    // }

    console.log(data)

    reset() // The resets return to the default values setted on the useForm
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          {/* <label htmlFor="task">I will Work On</label>
          The register function receives the name of the input and return methods to work with inputs in js, methods
          like function register(name: string)  {
            onChange: () => void;
            onBlur: () => void;
            onFocus: () => void;
          } 
          we use the spread operator to transform each method returned by register in a property for this input, so
          basically is the same thing as i put onChange or unBlur, etc, on the element

           */}

          <TaskInput
            placeholder="Name your project"
            list="task-suggestions"
            id="task"
            {...register('task')}
            type="text"
          />

          <datalist id="task-suggestions">
            <option value="Ignite" /> React Ignite
            <option value="Angular" /> Angular Course
            <option value="Vue" /> Vue Course
          </datalist>

          <label htmlFor="minutes-amount">for</label>
          <MinutesAmountInput
            placeholder="00"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            type="number"
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
