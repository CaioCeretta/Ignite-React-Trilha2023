import { ButtonTransaction, HeaderContainer, HeaderContent } from "./styles";

import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} />
        <ButtonTransaction>New Transaction</ButtonTransaction>
      </HeaderContent>
    </HeaderContainer>
  )
}