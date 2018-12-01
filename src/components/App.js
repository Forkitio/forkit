import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
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
import Recipe from './Recipe'
import Homepage from './Homepage'
import { exchangeTokenForAuth } from '../store/authStore'
import queryString from 'query-string'
import CreateRecipe from './CreateRecipe';
//import EditRecipe from './EditRecipe';
import {getCreatedRecipes} from './../store/createdRecipes';
import {getSavedRecipes} from './../store/savedRecipes';
import {getForkedRecipes} from './../store/forkedRecipes';

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
          <Route exact path='/' render = {({ history }) => <Homepage history={history}/> }/>
          <Route path='/survey/name' render = {() => <Name/>}/>
          <Route path='/survey/cuisine' render = { () => <Cuisine/>}/>
          <Route path='/survey/protein' render = { () => <Protein/>}/>
          <Route path='/survey/diet' render = { () => <Diet/>}/>
          <Route path='/survey/skill' render = { () => <Skill/>}/>
          <Route path='/survey/time' render = { () => <Time/>}/>
          <Route path='/signup' render = { () => <Signup/>}/>
          <Route exact path='/login' component={LoginPage} />

          <Switch>
          <Route exact path='/recipe/create' render={() => <CreateRecipe />}/>
          <Route path='/recipe/:name' render = { () => <Recipe/>}/>
          </Switch>
          <Route path = '/user/:userid/cookbook' render = {({ history }) => <Cookbook history={history}/> }/>
          <Route path = '/user/:userid/dashboard' render = {({ history }) => <Dashboard history={history}/>} />
          {/* <Route path='/recipe/edit/:id' render={({location, match, history}) => <EditRecipe location={location} history={history} match={match} />}/> */}
        </Fragment>
      </Router>
    )

  }
}


const mapDispatchToProps = dispatch => {
  return {
    tokenCheck : () => dispatch(exchangeTokenForAuth()),
  }
}
export default connect(null, mapDispatchToProps)(App)
