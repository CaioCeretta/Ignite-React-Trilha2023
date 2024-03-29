import styled from 'styled-components'

export type ButtonVariant = {
  variant: 'primary' | 'secondary' | 'success' | 'danger'
}

type ButtonContainerProps = {
  variant: ButtonVariant['variant']
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
  neutral: 'gray',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme['green-500']};

  /* 
  ${(props) => {
    return `background-color: ${buttonVariants[props.variant]}`
  }} */
`
