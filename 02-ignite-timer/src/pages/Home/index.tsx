import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useState } from 'react'

/* 
  There are numerous manners of creating forms in react, the way that we used is the most traditional way, it is not wrong
  but it has some problems, and we are going to work with forms in react we have two main ways

  Controlled / Uncontrolled

  Controlled is nothing more than maintaning in real time the state, the information that the user inserts in our application
  into the state, inside one variable inside of our component so we can keep track of everything change made by the user

  It brings us a lot of fluidability for us to show and to not show things in our interface based on the user input

  But, as anything in this world, it can have its good sides and bad sides

  The bad side is that in react, everytime we cause a state change, we also cause a re rendering in our component and
  react will recalculate all the component content, which can be very costly for the performance

  so other approach will be on the other home file

 */

/* Controlled example */

export default function Home() {
  const [task, setTask] = useState('')

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Name your task"
            onChange={(e) => setTask(e.target.value)}
            /* One good practice is that we set the value as the state variable, because if the variable changes from an
            origin, that is not the user typing, i also want to visually the input change to show the new value, what is
            quite common to happen.
            
            When we submit a form, and i want to clear the fields, let's say that we have a function of resetForm(), i'll
            go on each state variable and set it to an empty string, and we need our inputs to reflect that

            These are the controlled components, keep track of any modification and save them on the state

            Benefits:

            Because we have the real time values, we able to easily have access of these values when submitting and can
            easily show interface changes based on the inputs value

            */

            value={task}
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

        <StartCountdownButton disabled={!task} type="submit">
          <Play size="24" />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
