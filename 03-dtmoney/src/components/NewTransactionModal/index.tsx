import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionsFormSchema>




export function NewTransactionModal() {

  const {
    control,
    handleSubmit,
    register,
    formState: {
      isSubmitting
    }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

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
        <CloseButton><X size={24} /></CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input type="text" {...register('description')} placeholder="Description" />
          <input type="number" {...register('price', { valueAsNumber: true })} placeholder="Price" />
          <input type="text" {...register('category')} placeholder="Category" />

          <Controller
            control={control}
            name="type"
            render={({field}) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={24} />
                    Income
                  </TransactionTypeButton>

                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />
                    Outcome
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />



          <button type="submit" disabled={isSubmitting}>Add Transaction</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}