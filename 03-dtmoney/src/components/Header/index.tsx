import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          {/* We could both create that NewTransactionButton on the styles as a Dialog.Trigger or we could do it like this
          with the Dialog.Trigger wrapping it, but with a asChild property, it will change the component, so now the component
          will change and that Dialog.Trigger will not create a new button, but leverage the button that is already inside
          the tag and make that button be the trigger of the modal */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}