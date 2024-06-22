import { useContext } from "react";

import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";





export function Transaction() {
  const { transactions } = useContext(TransactionsContext)



  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td>Website Development</td>
              <td>
                <PriceHighlight variant="income">U
                  S$ 12.000,00
                </PriceHighlight>
              </td>
              <td>Sale</td>
              <td>13/04/2024</td>
            </tr>
            <tr>
              <td>Hamburguer</td>
              <td>
                <PriceHighlight variant="outcome">
                  US$ 59,00
                </PriceHighlight>
              </td>
              <td>Aliments</td>
              <td>13/04/2024</td>
            </tr>


          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}