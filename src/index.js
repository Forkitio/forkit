import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store/index.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { yellow, black, grey, red } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
      light: red[300],
      dark: red[900]
    },
    secondary: {
      main: yellow[500],
      light: yellow[300],
      dark: yellow[900]
    }
  }
})



render(
  <MuiThemeProvider theme = {theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root')
)
