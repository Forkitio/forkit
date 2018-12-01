import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import RecipeCard from './RecipeCard'
import { Grid, Typography, Button, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { getRecipes } from '../store/recipeAPI.js'
import recipeData from './tempData'
import Nav from './Nav'
import {Link} from 'react-router-dom';



// To avoid having to call the recipe API everytime we reload as we have a limited number of calls we can use, I have created temporary recipe data to develop with.  To use real API data, change the constant below to be equal to 1
const useTempData = 0

class Dashboard extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        if (useTempData == 1){
            this.props.getRecipes("Asian")
        }
    }

    render () {
        let _recipes

        const { classes, recipes } = this.props
        
        if (useTempData == 1){
            _recipes = recipes.slice(0,8)
        } else {
            _recipes = recipeData.hits.slice(0,8)
        }

        return (
            // For now, Dashboard will recommend recipe based on your favorite protein, cuisine and time preference

            // ADD FOLLOW ANOTHER USER?
            <div className = {classes.white}>
            <Nav/>
            <div className = {classes.navBarSpace}>
                <br/>
                <Typography variant = 'h6'>
                    Dashboard
                </Typography>
                <Typography variant = 'body1'>
                    Our picks for you are below.  Click on any recipe to get started.
                </Typography>
                <br/>
                <Divider/>

                <Typography variant = 'h6'>
                    My Cookbook
                </Typography>
                <Link to={'/recipe/create'}>
                <Button variant = 'outlined' color = 'primary' size = 'small'>
                    + Add a Recipe
                </Button>
                </Link>
                <br />
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    Chicken Recipes
                </Typography>
                <Grid container spacing = {24}>
                { _recipes.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe.recipe} />
                    </Grid>
                ))}
                </Grid>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    Mexican Recipes
                </Typography>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    Quick Recipes
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

const mapStateToProps = state => ({
    recipes: state.recipes
})

const mapDispatchtoProps = ({ getRecipes }) 

export default withStyles(styles)(connect(mapStateToProps, mapDispatchtoProps)(Dashboard))


