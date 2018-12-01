import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import RecipeCard from './RecipeCard'
import { Grid, Typography, Button, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { getRecipes } from '../store/recipeAPI.js'
import recipeData from './tempData'
import Nav from './Nav'

const useRealData = 0

class ViewRecipe extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        //we need to fetch the recipe from the database based on the URL params and mnount this in here,
        //for now, we will use more fake data
    }


    render () {

        let _recipe

        if (useRealData == 0){
            _recipe = this.propss.recipe
        } else {
            _recipe = recipeData[0].recipe
        }

        return (
            // For now, Dashboard will recommend recipe based on your favorite protein, cuisine and time preference

            // ADD FOLLOW ANOTHER USER?
            <div className = {classes.white}>
            <Nav/>
            <div className = {classes.navBarSpace}>
                <img src = {_recipe.image} classname = {classes.image}/>
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
                <Button variant = 'outlined' color = 'primary' size = 'small'>
                    + Add a Recipe
                </Button>
                <br />
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    My Favorite People
                </Typography>
                <Button variant = 'outlined' color = 'primary' size = 'small'>
                    + Add Favorite Person
                </Button>
                <br />
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    Chicken Recipes
                </Typography>
                <Grid container spacing = {24}>
                { _recipes.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.spacing}>
                        <RecipeCard
                            recipeName = {recipe.recipe.label}
                            author = {recipe.recipe.source}
                            image = {recipe.recipe.image}
                            url = {recipe.recipe.url}
                        />
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


export default withStyles(styles)(connect(mapStateToProps)(ViewRecipe))


