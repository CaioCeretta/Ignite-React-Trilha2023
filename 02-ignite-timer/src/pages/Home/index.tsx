import { HandPalm, Play } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { useEffect, useState } from 'react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

const NewCycleFormValidationSchema = zod.object({
  owner: zod.string().optional(),
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsAmountPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let cycleInterval = 0

    if (activeCycle) {
      cycleInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles(
            cycles.map((state) => {
              if (state.id === activeCycleId) {
                return { ...state, finishedDate: new Date() }
              } else {
                return state
              }
            }),
          )

          setSecondsAmountPassed(totalSeconds)

          clearInterval(cycleInterval)
        } else {
          setSecondsAmountPassed(secondsDifference)
        }
      }, 1000)
    }

    /* The return function happens as the first thing of an useEffect, so if i one of the depencies change and i'm going to
    execute that interval again, i want to do something to clean what i was doing on the last useEffect so it cannot keep
    on running.
    
    So basically, when we set an interval, everytime that the dependency changes and the useEffect runs, we are creating
    a new interval, so here is where we delete the intervals that we don't need anymore
    
    */
    return () => {
      clearInterval(cycleInterval)
    }
  }, [activeCycle, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map((state) => {
        if (state.id === activeCycleId) {
          return { ...state, interruptedDate: new Date() }
        } else {
          return state
        }
      }),
    )

    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  console.log(cycles)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            disabled={!!activeCycle}
            placeholder="Name your task"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="React"></option>
            <option value="Angular"></option>
            <option value="Node"></option>
          </datalist>

          <label htmlFor="minutesAmount">For</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            disabled={!!activeCycle}
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <label>Minutes</label>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size="24" />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size="24" />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
