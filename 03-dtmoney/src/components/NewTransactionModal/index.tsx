import * as Dialog from "@radix-ui/react-dialog";
import { X } from 'phosphor-react'
import { CloseButton, Content, Overlay } from "./styles";

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

            <button type="submit">Add Transaction</button>
          </form>
        </Content>
      </Dialog.Portal>
  )
}