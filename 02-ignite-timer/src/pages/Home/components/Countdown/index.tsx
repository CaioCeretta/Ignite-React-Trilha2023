import { useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'

interface CountdownProps {
  cycles: any
  activeCycle: any
  activeCycleId: string | null
  setCycles: any
}

export function Countdown({
  activeCycle,
  activeCycleId,
  setCycles,
  cycles,
}: CountdownProps) {
  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let cycleInterval = 0

    if (activeCycle) {
      cycleInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles(
            cycles.map((state) => {
              if (state.id === activeCycleId) {
                return { ...state, finishedDate: new Date() }
              } else {
                return state
              }
            }),
          )

          setSecondsAmountPassed(totalSeconds)

          clearInterval(cycleInterval)
        } else {
          setSecondsAmountPassed(secondsDifference)
        }
      }, 1000)
    }

    /* The return function happens as the first thing of an useEffect, so if i one of the depencies change and i'm going to
    execute that interval again, i want to do something to clean what i was doing on the last useEffect so it cannot keep
    on running.
    
    So basically, when we set an interval, everytime that the dependency changes and the useEffect runs, we are creating
    a new interval, so here is where we delete the intervals that we don't need anymore
    
    */
    return () => {
      clearInterval(cycleInterval)
    }
  }, [activeCycle, totalSeconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
