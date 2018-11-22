import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import LoginPage from './LoginPage'
import { exchangeTokenForAuth } from '../store/authStore'
import queryString from 'query-string'

class App extends Component {
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    if(query.token) {
      window.localStorage.setItem('token', query.token);
      this.props.history.push('/');
    }
    this.props.tokenCheck();
  }
  render(){
    return (
      <Router>
        <Fragment>
          <Nav />
          <Route exact path='/login' component={LoginPage} />
        </Fragment>
      </Router>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    tokenCheck : () => dispatch(exchangeTokenForAuth())
  }
}
export default connect(null, mapDispatchToProps)(App)
