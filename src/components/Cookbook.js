import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, Button, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import {getCreatedRecipes} from './../store/createdRecipes';
import {getSavedRecipes} from './../store/savedRecipes';
import {getForkedRecipes} from './../store/forkedRecipes';
import Nav from './Nav'

class Cookbook extends Component {

    componentDidMount(){
        const { id } = this.props.auth
        this.props.loadSavedRecipes(id)
        this.props.loadForkedRecipes(id)
        this.props.loadCreatedRecipes(id)
    }

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
      marginTop: '70px',
      marginLeft: '15px',
      backgroundColor: 'white'
    },
    white: {
        backgroundColor: 'white'
    }
});

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
      loadSavedRecipes: (userId) => dispatch(getSavedRecipes(userId)),
      loadForkedRecipes: (userId) => dispatch(getForkedRecipes(userId)),
      loadCreatedRecipes: (userId) => dispatch(getCreatedRecipes(userId))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Cookbook))
