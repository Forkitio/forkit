import React from 'react'

const oauthLogin = () => {
  return (
    <form method='get' action='/api/pinterest'>
      <button type='submit'>Login with Pinterest</button>
    </form>
  )
};

export default oauthLogin
