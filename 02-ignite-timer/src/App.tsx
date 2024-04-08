import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { Router } from './pages/Router'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './Home'

function App() {
  return (
    // <ThemeProvider theme={defaultTheme}>
    //   <BrowserRouter>
    //     <Router />
    //   </BrowserRouter>
    //   <GlobalStyle />
    // </ThemeProvider>
    <Home />
  )
}

export { App }
