import { styled } from './styles'

const Button = styled('button', {
  fontFamily: '$default',
  backgroundColor: '$ignite500',
  borderRadius: ' ',
})

export function App() {
  return <Button>Ciao mondo</Button>
}
