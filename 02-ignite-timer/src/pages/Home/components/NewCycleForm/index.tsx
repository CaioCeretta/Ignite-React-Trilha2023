import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

export function NewCycleForm() {
  const NewCycleFormValidationSchema = zod.object({
    owner: zod.string().optional(),
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60),
  })

  type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
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
  )
}
