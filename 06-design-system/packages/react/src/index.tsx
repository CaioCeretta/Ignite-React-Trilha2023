import { styled } from './styles'

const Button = styled('button', {
  fontFamily: '$default',
  backgroundColor: '$ignite500',
  borderRadius: ' ',
})

export function App() {
  return <h1 style={{ color: colors.ignite300 }}>Ciao mondo</h1>
}
