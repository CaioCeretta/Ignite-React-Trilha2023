import { useContext } from "react"
import { TransactionsContext } from "../contexts/TransactionsContext"

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  /*
  Reduce Method Reminder

  The reduce method is when we want to go through an array and reduce that array to another data structure
  
  In this case we want to convert the transactions array into an object that will follow this structure:

  {entriesTotal, outcomeTotal, total}

  the accumulator in this case, when we set it as the default value, it will have that shape, every instruction that we
  give to our reduce, is based on that accumulator, because it is what is going to be returned in the end
*/

  const summary = transactions.reduce((acc, transaction) => {

    if (transaction.type === 'income') {
      acc.income += transaction.price
      acc.total += transaction.price
    } else {
      acc.outcome += transaction.price
      acc.total -= transaction.price
    }

    return acc;
  }, { income: 0, outcome: 0, total: 0 })

  return summary
}