import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import Login from './Login'

class App extends Component {
  constructor() {
    super()
  }
  render(){
    return (
      <Router>
        <Fragment>
          <Nav />
          <Route exact path='/login' component={Login} />
        </Fragment>
      </Router>
    )

  }
}

export default connect(null, null)(App)
