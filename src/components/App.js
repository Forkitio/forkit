import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import Cookbook from './Cookbook'
import Dashboard from './Dashboard'
import LoginPage from './LoginPage'
import Name from  './Name'
import Protein from './Protein'
import Skill from './Skill'
import Homepage from './Homepage'
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
    //KG note: once I can figure out how to get auth working, cookbook route should be '/user/:userId/cookbook', dashboard route should be '/user/:userId/dashboard'


    return (
      <Router>
        <Fragment>
          <Route  exact path='/' render = { () => <Homepage/> }/>
          <Route path='/survey/name' render = { () => <Name/>}/>
          <Route path='/survey/protein' render = { () => <Protein/>}/>
          <Route path='/survey/skill' render = { () => <Skill/>}/>
          <Route exact path='/login' component={LoginPage} />
          <Route path = '/user/cookbook' render = {() => <Cookbook /> }/>
          <Route path = '/user/dashboard' render = {() => <Dashboard />} />
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
