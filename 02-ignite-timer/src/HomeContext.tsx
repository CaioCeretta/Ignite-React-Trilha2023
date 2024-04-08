import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)
/*
  When we create a context, we need to inform the values that it will have be, we can't ommit something or add something new
  because ts will understand that our component always will have that shape

  when we createContext and on the arguments, we set {} as any, we are telling javascript it's no use trying to enforce
  a typing pattern inside of our context

*/

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)

  return (
    <div>
      <h1>New Cycle Form</h1>
      <span>Active Cycle Id: {activeCycle}</span>
      <button
        onClick={() => {
          setActiveCycle(2)
          // This wouldn't work because we can't alter the context variables
        }}
      >
        Update the Active Cycle
      </button>
      {/* In react, every time we have a variable that is going to be modified, for whatever may be the cause. That
      variable must be a state, and active cycle in this case is not a state, it is a primitive variable, a number
      
      */}
    </div>
  )
}

function Countdown() {
  const { activeCycle } = useContext(CyclesContext)

  return (
    <div>
      <h1>Countdown</h1>
      <span>Active Cycle Id: {activeCycle}</span>
    </div>
  )
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)
  /* The reason why we choose the Home or the father component, is because the home is the component which wraps the other
  components that need this information.
  
  So the context data needs to be on the most outer component

  Now, instead of us setting the value of the active cycle directly on the initial state, we create a provider, a provider
  is what is going to provide the values to the child components

  Even though we setted the activeCycle as 5 on creation of the context, what is going to be prevail, is always the value
  of the provider, that in this case is 0

  */

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        setActiveCycle,
      }}
    >
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  )
}
