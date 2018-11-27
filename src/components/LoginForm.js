import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/authStore'

class LoginForm extends Component {
  constructor () {
    super ()
    this.state = {
      username : '',
      password : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  handleChange(evt) {
    this.setState({ [ evt.target.name ] : evt.target.value })
  }

  onSave(evt) {
    evt.preventDefault();
    const { username, password } = this.state;
    console.log('onSave', {username, password })
    this.props.login({ username, password })
      .catch(ex => this.setState({ error : 'bad credentials'}))
  }
  render() {
    const { username, password, error } = this.state;
    const { handleChange, onSave } = this;
    return (
      <form onSubmit={ onSave }>
        <input value={ username } name='username' placeholder='name' onChange={ handleChange } />
        <input value={ password } name='password' placeholder='password' onChange={ handleChange } />
        <button>Login</button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    login : credentials => dispatch(login(credentials, history))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm)
