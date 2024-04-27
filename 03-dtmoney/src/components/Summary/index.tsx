import { SummaryCard, SummaryContainer } from "./styles";

import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entries</span>
          <ArrowCircleUp size={32} color="#00b37a" />
        </header>

        <strong>U$ 5.200.00</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Withdrawals</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>U$ 2.200.00</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#ffffff" />
        </header>

        <strong>U$ 3.180.00</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}

