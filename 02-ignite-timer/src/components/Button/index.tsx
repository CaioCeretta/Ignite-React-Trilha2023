// import styles from './button.module.css'
import { ButtonContainer, ButtonVariant } from './button.styles'

interface ButtonProps {
  variant?: ButtonVariant['variant']
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Send</ButtonContainer>
}
