import { Play } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const NewCycleFormValidationSchema = zod.object({
  owner: zod.string().optional(),
  task: zod.string().min(1, 'Informe a tarefa'),
  // atributo com erro de digitação
  minutesAmount: zod.number().min(5).max(60),
})

// Instructor prefers using interface when defining the validation object.
// interface NewCycleFormData {
// task: string
// minutesAmount: number
// }

/* and prefers using type when creating a typing from another reference, from another variable, or something like that, as it is in this case
 */

/* Here it is with zod.infer, we are saying that zod will automatically infer the type.
One thing to remember is that we cannot use a JavaScript variable, which is the case of NewCycleFormValidationSchema,
 inside TypeScript, it can't understand it, we always need to convert the js variable into a type, something specific to
 TypeScript, for that it's commonly used 'typeof'

 Now if we add new properties to the 'NewCycleFormValidationSchema', it will be automatically added to the type created
 below
*/
type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

export default function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task: 'piroro',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
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
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
            /* This second parameter of the config object is very important, otherwise, zod can interpret it as a string
            and it will crash our code */
          />
          <label>Minutes</label>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size="24" />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
