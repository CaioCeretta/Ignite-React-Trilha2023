import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export default function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>My History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount}</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                  })}
                  {/* 
                    One option to a portuguese alternative
                   {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}

                  */}
                </td>
                <td>
                  {/* Conditional Recap: the && sign means that, is just a if then, without and else and js will only
                  execute the right side if the left side is set to true  */}
                  {cycle.finishedDate && (
                    <Status statusColor="green">Completed</Status>
                  )}

                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrupted</Status>
                  )}

                  {!cycle.interruptedDate && !cycle.finishedDate && (
                    <Status statusColor="yellow">Running</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
