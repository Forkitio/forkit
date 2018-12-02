import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import OAuthLogins from './OAuthLogins'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Nav from './Nav'

const LoginPage = (props) => {
  const { classes, history } = props

  return (
    <Fragment>
      <Nav/>
      <Grid container justify='center' style={{marginTop: '200px'}}>
      <br/>
      <div className = {classes.navBarSpace} style={{textAlign:'center'}}>
        <Typography variant = 'h4' className={classes.boldedText} >
          Hey there, sign in here
        </Typography>
        <br/>
        <br/>
        <LoginForm history={history}/>
        <OAuthLogins />
      </div>
      </Grid>
    </Fragment>
  )
}

const styles = () => ({
  navBarSpace: {
    marginTop: '100px',
    marginLeft: '15px'
  },
  boldedText: {
    fontWeight: 'bold'
  }
});

export default withStyles(styles)(LoginPage)

