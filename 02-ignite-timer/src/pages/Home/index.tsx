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

import { useForm } from 'react-hook-form'

/* In this code we are going to use 'react-hook-form', which allows us to work with forms in controlled way but also on
uncontrolled way, with it, we can have both performances and flexibility, fluidity, on our form fields */

export default function Home() {
  const { register, handleSubmit, watch } = useForm()

  /**
   * The function register,receives the input name, and returns us some methods that we utilize to work with inputs on
   * javascript, it gives us back methods such as
   *
   * return {
   *  onChange: () => void,
   *  onBlur: () => void,
   *   onFocus: () => void
   *  //Other input functions
   * }
   *
   * So we use the spread syntax when declaring the register, like {...register('inputname')}, so our each one of these
   * register returned methods, into an attribute of our input
   *
   * so if we did     register('task'). and tried to autocomplete, we would see all the available methods
   */

  /* The watch function is for us to keep track of the registered fields, and know our values in real time */
  const wTask = watch('task')

  // Aux variable
  const isSubmitDisabled = !wTask

  function handleCreateNewCycle(data: any) {
    // When we involved the handleSubmit with this function, now data will be the data of the inputs of our form
    console.log(data)
  }

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

          <label htmlFor="duration">For</label>
          <MinutesAmountInput
            id="duration"
            step="5"
            min="5"
            max="60"
            type="number"
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
            /*
            As the second parameter of the register, we can pass a configuration object, the property that we'll use is the 
            valueAsNumber, and if we pass it as true, when we submit our form, it will come as a number. if we didn't pass
            that config parameter, it would come back as a string



            */
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
