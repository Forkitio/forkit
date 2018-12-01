import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/authStore'
import Dashboard from './Dashboard'

class LoginForm extends Component {
  constructor () {
    super ()
    this.state = {
      email : '',
      password : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({ [ evt.target.name ] : evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password }, this.props.history)
      .catch(ex => this.setState({ error : 'bad credentials'}))
  }
  render() {
    const { email, password, error } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
        <input value={email} name='email' placeholder='email' onChange={handleChange} />
        <input value={password} name='password' placeholder='password' onChange={handleChange} />
        <button>Login</button>
      </form>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : (credentials, history) => dispatch(login(credentials, history))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm)
