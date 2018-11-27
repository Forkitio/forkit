import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import OAuthLogins from './OAuthLogins'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const LoginPage = (props) => {
  const { classes, history } = props

  return (
    <Fragment>
      <div className = {classes.navBarSpace}>
        <Typography variant = 'h6'>
          Login Page
        </Typography>
        <LoginForm history={history}/>
        <OAuthLogins />
      </div>
    </Fragment>
  )
}

const styles = () => ({
  navBarSpace: {
    marginTop: '100px',
    marginLeft: '15px'
  }
});

export default withStyles(styles)(LoginPage)

