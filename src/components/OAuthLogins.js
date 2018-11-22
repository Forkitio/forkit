import React from 'react'
import { connect } from 'react-redux'

const oauthLogin = () => {
  return (
    <form method='get' action='/api/pinterest'>
      <button type='submit'>Login with Pinterest</button>
    </form>
  )
};

export default connect(null, null)(oauthLogin)
