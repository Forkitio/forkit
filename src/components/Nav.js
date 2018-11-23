import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/authStore'
import { Button, Typography, AppBar, Toolbar} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Nav = ({ auth, isLoggedIn, logout, classes }) => {

  return (
    <div className = {classes.root}>
      <AppBar color = 'default' position = 'fixed'>
      <Toolbar>
        <Typography variant = 'h6' className = {classes.grow}>
          FORKIT
        </Typography>
      
        {
          isLoggedIn ? (
            <div>
              <span>Hello {auth.name}</span>
              <Link to = {`/user/${auth.id}/cookbook`}>cookbook</Link>
              <Link to = {`/user/${auth.id}/dashboard`}>dashboard</Link>
              <button type='button' onClick={logout}>Logout</button>
            </div>
          ) 
          : 
          // <div style = {{float: 'right'}}>
            <Link to='/login' className = {classes.noUnderline}>
              <Button variant = 'outlined' color = 'inherit' size = 'small'>
                Login
              </Button>
            </Link>
          // </div>
          }
        </Toolbar>
    </AppBar>
    </div>
  )
};

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  noUnderline: {
    textDecoration: 'none'
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
    logout : () => dispatch(logout())
  }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Nav))
