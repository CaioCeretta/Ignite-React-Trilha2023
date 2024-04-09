import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { Router } from './pages/Router'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export { App }
