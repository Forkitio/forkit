import React from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'


const oauthLogin = () => {
  return (
    <div style={{textAlign:'center'}}>
    <form method='get' action='/api/google'>
      <Button variant='contained' color='primary' size='large' type='submit'>
          Login with Google
      </Button>
    </form>
    </div>
  )
};

export default connect(null, null)(oauthLogin)
