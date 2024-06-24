import { ReactNode, createContext, useEffect, useState } from "react";
import { Transaction } from "../pages/Transactions";

interface TransactionContextType {
  transactions: Transaction[]
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionProviderProps {
  children: ReactNode
}

export function TransactionsProvider({children}: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])


  useEffect(() => {

    async function loadTransactions() {
      await fetch('http://localhost:3333/transactions').then(response => {
        response.json().then(data => {
          setTransactions(data)
        })
      })
    }

    loadTransactions();



  }, [])


  return (
    <TransactionsContext.Provider value={{
      transactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}