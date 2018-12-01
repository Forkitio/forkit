import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/authStore'
import { Button, Typography, AppBar, Toolbar} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

class Nav extends Component {
  constructor() {
    super()
    this.state = {
      loggedOut : false
    }
  }
  render () {
    const { auth, isLoggedIn, logout, classes, history } = this.props;
    //if(this.state.loggedOut) { return <Redirect to='/' /> }
    return (
      <div className = {classes.root}>
      <AppBar position = 'fixed' className = {classes.NavColor}>
      <Toolbar>
        <Typography variant = 'h6' className = {classes.grow}>
          ForkIt
        </Typography>

        {
          isLoggedIn ? (
            <div>
              <span>Hello {auth.firstName + ' ' + auth.lastName}</span>
              <Link to = {`/user/${auth.id}/cookbook`}>cookbook</Link>
              <Link to = {`/user/${auth.id}/dashboard`}>dashboard</Link>
              <button type='button' onClick={() => logout(history)}>Logout</button>
            </div>
          )
          :
          // <div style = {{float: 'right'}}>
            <Link to='/login' className = {classes.noUnderline}>
              <Button variant = 'outlined' size = 'small' className = {classes.loginButton}>
                Login
              </Button>
            </Link>
          // </div>
          }
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    color: 'white'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  noUnderline: {
    textDecoration: 'none',
  },
  loginButton: {
    borderColor: 'white',
    color: 'white'
  },
  navColor: {
    color: 'FF3B4A'
  }
};

const mapStateToProps = ({ auth }) => {
  return {
    isLoggedIn : auth.id,
    auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout : (history) => dispatch(logout(history))
  }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Nav))
