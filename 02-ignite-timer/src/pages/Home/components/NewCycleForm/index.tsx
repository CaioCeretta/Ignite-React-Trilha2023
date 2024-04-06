import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

export function NewCycleForm() {
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
