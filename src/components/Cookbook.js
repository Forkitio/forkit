import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, Button, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Nav from './Nav'

class Cookbook extends Component {

    render () {
        const { classes, history } = this.props;
        return(
            <div className = {classes.white}>
                <Nav history={history}/>
                <div className = {classes.navBarSpace}>
                    <Typography variant = 'h6'>
                        My Cookbook
                    </Typography>
                </div>
            </div>
        )
    }
}


const styles = theme => ({
    navBarSpace: {
      marginTop: '60px',
      marginLeft: '15px',
      backgroundColor: 'white'
    },
    white: {
        backgroundColor: 'white'
    }
});

export default withStyles(styles)(Cookbook)
