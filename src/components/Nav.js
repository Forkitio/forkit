import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/authStore'

const Nav = ({ auth, isLoggedIn, logout }) => {
  return (
    <Fragment>
      {
      isLoggedIn ? (
          <div>
            <span>Hello {auth.name}</span>
            <button type='button' onClick={logout}>Logout</button>
          </div>
        ) : <Link to='/login'>Login</Link>}
    </Fragment>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
