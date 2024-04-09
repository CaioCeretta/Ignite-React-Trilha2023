import { createContext, useState } from 'react'
import * as zod from 'zod'

import { HandPalm, Play } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  secondsAmountPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

const NewCycleFormValidationSchema = zod.object({
  owner: zod.string().optional(),
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})
type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextType)
/**
 * If i just passsed the create context as {} and not informing its type, like the as the type we've just created, when we
 * hover over the CyclesContext it would show that the variable is an empty context, and we don't want it.
 *
 * An empty context biggest problems is that when the on the context provider we pass on the return, we pass the value to the
 * provider, ts wouldn't have the intelligence to know which values the context accepts. But if we say our context type
 * on the creation, ts will know what we're talking about
 */

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  /**
   * Instructor tip
   * In his particular case, he doesn't like to send the whole setCycles (or any other state setting function) inside a
   * context
   * Because if we are going to send the setCycles function into the context we will have to add its typescript typing
   * and its typing, if we hover up the setCycles is a React.Dispatch<React.SetStateAction<Cycle[]>>.
   * which can very laborious.
   * So instead of sending the whole setCycles function, the instructor will check what the state function is doing and then
   *
   * Which in the setCycles case, it is basically setting a cycle as finished, so he likes to create a new function, inside
   * this component, and send only this function to the child, that will just call it and the parent will handle the
   * cycle changes, no need to pass the state setter
   *
   *
   */

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setSecondsAmountPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(
      cycles.map((state) => {
        if (state.id === activeCycleId) {
          return { ...state, finishedDate: new Date() }
        } else {
          return state
        }
      }),
    )
  }

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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            secondsAmountPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
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
