import React from 'react'
import { ThemeProvider } from 'styled-components' // importar o themeProvider
import { defaultTheme } from './Components/styles/themes/default'
import { GlobalStyle } from './Components/styles/global'
import { BrowserRouter } from 'react-router-dom'
//é necessário importar o BrowserRouter e colocar a Router dentro dele
import Router from './Router'



const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
       <Router/>
      </BrowserRouter>

    <GlobalStyle/>
    </ThemeProvider>
  )
}
//o ThemeProvider como é um componente, ele recebe a propriedade theme, que atrelamos ao defaultTheme que já foi escrito
export default App