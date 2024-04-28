import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transaction() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width='50%'>Site Development</td>
              <td>
                <PriceHighlight variant="Income">
                  U$ 5.200.00
                </PriceHighlight>
              </td>
              <td>Sells</td>
              <td>26/04/2024</td>
            </tr>
            <tr>
              <td width='50%'>Housemaid</td>
              <td>
                <PriceHighlight variant="Outcome">
                  U$ -1.000.00
                </PriceHighlight>
              </td>
              <td>House Spenses</td>
              <td>26/04/2024</td>
            </tr>
            <tr>
              <td width='50%'>Projects</td>
              <td>
                <PriceHighlight variant="Outcome">
                  U$ -1.200.00
                </PriceHighlight>
              </td>
              <td>Hosting</td>
              <td>26/04/2024</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}