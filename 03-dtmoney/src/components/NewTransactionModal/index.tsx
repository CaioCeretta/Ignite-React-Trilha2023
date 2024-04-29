import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";

export function NewTransactionModal() {
  {/* 
          Portals offers us an elegant way of rendering a child component inside a DOM Node that exists out of the parent
        hierarchy

          So in this modal case, when we are opening it inside the page, we don't want it to follow the parent flow and
        go outside of it. both the overlay and the modal doesn't make sense to belong to the parent flow, which is the header
        */}

  return (
  
    <Dialog.Portal >
        <Overlay />
        <Content>
          <Dialog.Title> New Transaction</Dialog.Title>
          <CloseButton><X size={24}/></CloseButton>
          <form action="">
            <input type="text" placeholder="Description"/>
            <input type="text" placeholder="Price"/>
            <input type="text" placeholder="Category"/>

            <TransactionType>
              <TransactionTypeButton value="income" variant="income">
                <ArrowCircleUp size={24} />
                Income
              </TransactionTypeButton>
    
              <TransactionTypeButton value="outcome" variant="outcome">
                <ArrowCircleDown size={24}/>
                Outcome
              </TransactionTypeButton>
            </TransactionType>

            <button type="submit">Add Transaction</button>
          </form>
        </Content>
      </Dialog.Portal>
  )
}