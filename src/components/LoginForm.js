import React, { Component, Fragment } from 'react'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'
import { connect } from 'react-redux'
import { login } from '../store/authStore'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  divstyle: {
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
      email : '',
      password : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = this.state;
    console.log('onSave', { email, password })
    this.props.login({ email, password }, this.props.history)
      .catch(ex => this.setState({ error: 'bad credentials' }))
  }
  render() {
    const { email, password, error } = this.state;
    const { handleChange, handleSubmit } = this;
    const { classes } = this.props
    return (
      <Fragment>
        <Grid container justify='center' display="flex">
        <div className={classes.divstyle}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              value={email}
              onChange={handleChange}
              variant='outlined'
              name='email'
            />
            <TextField
              label="Password"
              value={password}
              onChange={handleChange}
              className={classes.fieldstyle}
              variant='outlined'
              name='password'
              type='password'
            />
            <div>
            <br/>
            <Button variant='contained' color='primary' size='large' type='submit'>
              Login
            </Button>
            </div>
            {/* <button>Login</button> */}
          </form>
        </div>
        </Grid>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : (credentials, history) => dispatch(login(credentials, history))
  };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginForm))