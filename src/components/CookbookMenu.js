import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, Button, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Nav from './Nav'

class Cookbook extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedIndex: 1
        }
    }

    handleListItemClick(i){
        this.setState({selectedIndex: i})
    }

    render () {

        const { classes } = this.props

        return(
            <div className = {classes.white}>
                <Nav />
                <div className = {classes.navBarSpace}>
                    <Typography variant = 'h6'>
                        My Cookbook
                    </Typography>
                    
                </div>
            </div>
        )
    }
}

// Add a recipe
// Discover recipes
// My favorites


const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });
  

export default withStyles(styles)(Cookbook)
