import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import OAuthLogins from './OAuthLogins'

const LoginPage = (props) => {

  return (
    <Fragment>
      <h3>Login Page</h3>
      <LoginForm />
      <OAuthLogins />
    </Fragment>
  )
}

export default LoginPage
