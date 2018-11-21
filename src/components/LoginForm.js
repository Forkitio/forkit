import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/authStore'

class LoginForm extends Component {
  constructor () {
    super ()
    this.state = {
      name : '',
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
    const { name, password } = this.state;
    console.log('onSave', {name, password })
    this.props.login({ name, password })
      .catch(ex => this.setState({ error : 'bad credentials'}))
  }
  render() {
    const { name, password, error } = this.state;
    const { handleChange, onSave } = this;
    return (
      <form onSubmit={ onSave }>
        <input value={ name } name='name' placeholder='name' onChange={handleChange} />
        <input value={ password } name='password' placeholder='password' onChange={handleChange} />
        <button>Login</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : credentials => dispatch(login(credentials))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm)
