import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string()
})


type SearchFormInputs = z.infer<typeof searchFormSchema>


export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  /*One good practice is to name functions which are triggered by an user action, start its name with handle
  And functions that are triggered after side effects or simply are called by our application, would only be called, in
  this case, as searchTransactions
  */
  async function handleSearchTransactions(data: SearchFormInputs) {
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Search transactions"
      {...register('query')}/>
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20}/>
        Search
      </button>
    </SearchFormContainer>
  )
}