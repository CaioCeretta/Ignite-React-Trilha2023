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

export default function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput type="text" id="task" placeholder="Name your task" />

          <label htmlFor="duration">For</label>
          <MinutesAmountInput id="duration" type="number" placeholder="00" />
          <label>Minutes</label>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled type="submit">
          <Play size="24" />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
