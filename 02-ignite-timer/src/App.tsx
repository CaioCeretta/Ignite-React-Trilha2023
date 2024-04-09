import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { Router } from './pages/Router'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CyclesContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export { App }
