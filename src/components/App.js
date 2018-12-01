import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import Cookbook from './Cookbook'
import Dashboard from './Dashboard'
import LoginPage from './LoginPage'
import Name from  './Name'
import Protein from './Protein'
import Cuisine from './Cuisine'
import Skill from './Skill'
import Diet from './Diet'
import Time from './Time'
import Signup from './Signup'
import Homepage from './Homepage'
import { exchangeTokenForAuth } from '../store/authStore'
import queryString from 'query-string'
import CreateRecipe from './CreateRecipe';
import {getRecipes} from './../store/recipes';

class App extends Component {

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    if(query.token) {
      window.localStorage.setItem('token', query.token);
      this.props.history.push('/');
    }
    this.props.tokenCheck();
    this.props.loadRecipes();
  }

  render(){
    //KG note: once I can figure out how to get auth working, cookbook route should be '/user/:userId/cookbook', dashboard route should be '/user/:userId/dashboard'


    return (
      <Router>
        <Fragment>
          <Route exact path='/' render = { () => <Homepage/> }/>
          <Route path='/survey/name' render = {() => <Name/>}/>
          <Route path='/survey/cuisine' render = { () => <Cuisine/>}/>
          <Route path='/survey/protein' render = { () => <Protein/>}/>
          <Route path='/survey/diet' render = { () => <Diet/>}/>
          <Route path='/survey/skill' render = { () => <Skill/>}/>
          <Route path='/survey/time' render = { () => <Time/>}/>
          <Route path='/signup' render = { () => <Signup/>}/>
          <Route exact path='/login' component={LoginPage} />
          <Route path = '/user/cookbook' render = {() => <Cookbook /> }/>
          <Route path = '/user/dashboard' render = {() => <Dashboard />} />
          <Route path='/recipe/create' render={() => <CreateRecipe />}/>
        </Fragment>
      </Router>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    tokenCheck : () => dispatch(exchangeTokenForAuth()),
    loadRecipes: () => dispatch(getRecipes())
  }
}
export default connect(null, mapDispatchToProps)(App)
