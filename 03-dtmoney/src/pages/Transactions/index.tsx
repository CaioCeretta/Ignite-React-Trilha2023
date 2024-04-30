import { useContext } from "react";

import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";





export function Transaction() {
  const {transactions} = useContext(TransactionsContext)



  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td width='50%'>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {/* If we are going to utilize a conditional, where the only option is the if, and not the else, we
                      can utilize only the &&
                      Because in JS, differently from other languages, when we do a conditional, for example, if we create
                      an if, and that if has two conditionals inside of it, like if(x > 5 || y < 3), when JS reads that
                      conditional, it reads the first condition, and if it's true, the rest of the condition isn't read,
                      and that is also true if we utilize the &&, if the first one is false, all the rest is ignored
                      that's why we can execute the outcome based on the first conditional */} 
                      {transaction.type === 'outcome' && ' - '} 
                     {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.type}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
            ))}
            
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}