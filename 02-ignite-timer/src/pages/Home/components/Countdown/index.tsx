import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../..'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    secondsAmountPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let cycleInterval: number

    if (activeCycle) {
      cycleInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)

          clearInterval(cycleInterval)
        } else {
          setSecondsPassed(secondsDifference)
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
  }, [activeCycle, activeCycleId, totalSeconds, markCurrentCycleAsFinished])

  const currentSeconds = activeCycle ? totalSeconds - secondsAmountPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

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
