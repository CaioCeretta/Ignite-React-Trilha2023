// import { Play } from 'phosphor-react'

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// // This library integrates herself with the react-hook-form
// import * as zod from 'zod'

// import {
//   CountdownContainer,
//   FormContainer,
//   HomeContainer,
//   MinutesAmountInput,
//   Separator,
//   StartCountdownButton,
//   // TaskInput,
// } from './styles'

// /*
//   There are numerous manners of creating forms in react, the way that we used is the most traditional way, it is not wrong
//   but it has some problems, and we are going to work with forms in react we have two main ways

//   Controlled / Uncontrolled

//   Controlled is nothing more than maintaning in real time the state, the information that the user inserts in our application
//   into the state, inside one variable inside of our component so we can keep track of everything change made by the user

//  */

// /* The zod validation utilizes an approach named 'Schema Based'

// Schema is nothing more than us defining a shape and validate the datas of our form based on that shape
//  */

// const newCycleFormValidationSchema = zod.object({
//   task: zod.string().min(1, 'Please, inform the task'),
//   minutesAmount: zod.number().min(5).max(60),
// })

// export default function Home() {
//   /*
//     React Hook Form is a library that's able to work on our forms both the controlled and in the uncontrolled way, so
//     we can get the best of both worlds, we can have performance without losing the fluidability of the form fields

//   */

//   /**
//    * useForm is a hook which couples various functions in one existent component, in this case, useForm is nothing more
//    * than a function which gives us back some informations, so we can do it like this
//    *
//    *
//    * useForm is just like we were creating a new form in our application and register is used to register some input into
//    * this form, register will say to us which fields we are going to have in our form
//    *
//    *  it is a function that basically receives the name of the input and returns to us all the methods that we utilize
//    * to work with inputs in js, methods like onChange, onFocus, onBlur, and so on, so we need to pass it in the property
//    * like {...register('name')} so it will couple all the functions that this method return into our input
//    *
//    * the handleSubmit is a hof, or more like a function which takes a callback of the submitHandler which is invoked on
//    * every form submit, than on the data that our handler receives, is an object with the values being keypaired with the
//    * name we gave to it
//    *
//    */

//   const { register, handleSubmit, watch, formState } = useForm({
//     resolver: zodResolver(newCycleFormValidationSchema),
//   })

//   function handleCreateNewCycle(data: any) {
//     console.log(data)
//   }

//   console.log(formState.errors)

//   const task = watch('task')
//   const isSubmitDisabled = !task

//   return (
//     <HomeContainer>
//       <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
//         <FormContainer>
//           <label htmlFor="task">I will work on</label>
//           <TaskInput
//             type="text"
//             id="task"
//             list="task-suggestions"
//             placeholder="Name your task"
//             {...register('task')}
//           />

//           <datalist id="task-suggestions">
//             <option value="React"></option>
//             <option value="Angular"></option>
//             <option value="Node"></option>
//           </datalist>

//           <label htmlFor="duration">For</label>
//           <MinutesAmountInput
//             id="duration"
//             step="5"
//             min="5"
//             max="60"
//             type="number"
//             {...register('minutesAmount')}
//           />
//           <label>Minutes</label>
//         </FormContainer>

//         <CountdownContainer>
//           <span>0</span>
//           <span>0</span>
//           <Separator>:</Separator>
//           <span>0</span>
//           <span>0</span>
//         </CountdownContainer>

//         <StartCountdownButton disabled={isSubmitDisabled} type="submit">
//           <Play size="24" />
//           Start
//         </StartCountdownButton>
//       </form>
//     </HomeContainer>
//   )
// }
