import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Nav from './Nav'


class Recipe extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Fragment>
                <Nav/>
                <img src="//food.fnr.sndimg.com/content/dam/images/food/fullset/2015/12/20/2/YW0707H_Chicken-Fettuccine-Alfredo_s4x3.jpg.rend.hgtvcom.826.620.suffix/1455049050343.jpeg"></img>
                <Typography variant='h3'>
                    Recipe Title
                </Typography>
                <Typography variant='subtitle-1'>
                    Author name
                </Typography>
                <hr/>
                <Typography variant='h5'>
                    Ingredients
                </Typography>
                <Typography variant='subtitle-1'>
                    Ingredients
                </Typography>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.recipes
})



export default connect(mapStateToProps)(Recipe)