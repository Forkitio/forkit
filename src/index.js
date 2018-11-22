import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'

render(
  <Provider store={store}>
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
)
