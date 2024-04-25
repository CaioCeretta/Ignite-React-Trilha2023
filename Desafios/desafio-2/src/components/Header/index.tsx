import { HeaderContainer } from "./styles";

import logo from '../../assets/Logo.svg'
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={logo} alt="" />
      </span>
      <nav>
        <NavLink to="/" title="Coffee Shop">
          Shop
        </NavLink>
        <NavLink to="#">
          Dunno
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}