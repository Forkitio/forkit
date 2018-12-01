import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/authStore'
import { Button, Typography, AppBar, Toolbar} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Nav = ({ auth, isLoggedIn, logout, classes }) => {

  return (
    <div className = {classes.root}>
      <AppBar position = 'fixed' className = {classes.NavColor}>
      <Toolbar>
        <Typography variant = 'h6' className = {classes.grow}>
        <Link to="/user/dashboard" className={classes.noUnderline}>
          <img src='/public/forkit.png'></img>
        </Link>
        </Typography>

        {
          isLoggedIn ? (
            <div>
              <div style={{display: 'flex', justifyContent:'space-around'}}>
              <Typography variant="subtitle1" className={classes.link} style={{marginRight:'20px'}}>
               Hey {auth.firstName}
              </Typography>
              <Link to = {`/user/cookbook`} className = {classes.link} style={{marginRight:'20px'}}>
              <Typography variant="subtitle1" className={classes.link}>
                My Cookbook
              </Typography>
              </Link>
              <Typography variant="subtitle1" className={classes.bold} style={{marginRight:'20px'}}>
              <Link to = {`/user/dashboard`} className = {classes.link}>
                Recipes
              </Link>
              </Typography>
              <Button variant = 'outlined' size = 'small' className = {classes.loginButton} onClick={logout}>
                Logout
              </Button>
              </div>
              {/* <button type='button' onClick={logout}>Logout</button> */}
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
};

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
  },
  boldedText:{
    fontWeight: 'bold'
  },
  link: {
    color: 'white',
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
