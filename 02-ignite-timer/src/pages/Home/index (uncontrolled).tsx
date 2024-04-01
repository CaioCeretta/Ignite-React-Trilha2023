import { Play } from 'phosphor-react'
import { FormEvent } from 'react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

/*
Uncontrolled example 

instead of saving the information of our input on each character, we could do it like this

*/

export default function Home() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Here we are getting the value of the input with the id of task

    // e.target.task.value

    /* This does not work, is just a showcase

    /*There are times that we use coontrolled and others uncontrolled
    
    Controlled common use cases:

    Simpler forms, less fields, an interface more simple

    Uncontrolled common use cases:

    We normally use uncontrolled forms when we don't keep track of the typed values in real time, for example, large forms
    with several inputs, with more than 100 inputs, if we updated the whole page when a character is tyoed it would take
    too much from our performance.
    */
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit} action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Name your task"
          />

          <datalist id="task-suggestions">
            <option value="React"></option>
            <option value="Angular"></option>
            <option value="Node"></option>
          </datalist>

          <label htmlFor="duration">For</label>
          <MinutesAmountInput
            id="duration"
            step="5"
            min="5"
            max="60"
            type="number"
            placeholder="00"
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

        <StartCountdownButton type="submit">
          <Play size="24" />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
