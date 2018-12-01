import React, { Component, Fragment } from 'react'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'
import { connect } from 'react-redux'
import { login } from '../store/authStore'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  divstyle: {
      marginTop: '300px',
      textAlign: 'center'
  },

  fieldstyle: {
      marginLeft: '20px'
  },

  noUnderline: {
      textDecoration: 'none'
  },

  boldedText: {
      fontWeight: 'bold'
  }
})



class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  onSave(evt) {
    evt.preventDefault();
    const { username, password } = this.state;
    console.log('onSave', { username, password })
    this.props.login({ username, password })
      .catch(ex => this.setState({ error: 'bad credentials' }))
  }
  render() {
    const { username, password, error } = this.state;
    const { handleChange, onSave } = this;
    const { classes } = this.props
    return (
      <Fragment>
        <Grid container justify='center'>
          <form onSubmit={onSave}>
            {/* <input value={username} name='username' placeholder='name' onChange={handleChange} />
            <input value={password} name='password' placeholder='password' onChange={handleChange} /> */}
            <TextField
              label="Username"
              value={username}
              onChange={handleChange}
              variant='outlined'
              name='username'
            />
            <TextField
              label="Password"
              value={password}
              onChange={handleChange}
              className={classes.fieldstyle}
              variant='outlined'
              name='password'
            />
            <div>
            <Button variant='contained' color='primary' size='large' type='submit'>
              Login
            </Button>
            </div>
            {/* <button>Login</button> */}
          </form>
        </Grid>
      </Fragment>

    )
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    login: credentials => dispatch(login(credentials, history))
  };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginForm))