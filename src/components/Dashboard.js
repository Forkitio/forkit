import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import RecipeCard from './RecipeCard'
import { Grid, Typography, Button, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { getAPIRecipes } from '../store/recipeAPI.js'
import recipeData from './tempData'
import Nav from './Nav'
import {Link} from 'react-router-dom';



// To avoid having to call the recipe API everytime we reload as we have a limited number of calls we can use, I have created temporary recipe data to develop with.  To use real API data, change the constant below to be equal to 1 and make sure you create a file for the API keys I provided
const useTempData = 0

class Dashboard extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { getAPIRecipes } = this.props
        const { auth } = this.props
        let _time

        if (auth.time === '>1 hr'){
            _time = '60%2B'
        } else if (auth.time === '1 hr'){
            _time = '0-60'
        } else if (auth.time === '30 min'){
            _time = '0-30'
        } else if (auth.time === '15 min'){
            _time = '0-15'
        }

        if (useTempData == 1 && auth.id){
            getAPIRecipes('cuisine', auth.protein[0])
            getAPIRecipes('protein', auth.cuisine[0])
            getAPIRecipes('time', _time)
        }
    }

    render () {
        let _recipesCuisine
        let _recipesTime
        let _recipesProtein
        let _recipesFavorite = recipeData.hits.slice(0,8)


        const { classes, recipeAPI, auth, history } = this.props


        if (useTempData == 1){
            _recipesCuisine = recipeAPI.cuisine.slice(0,8)
            _recipesTime = recipeAPI.time.slice(0,8)
            _recipesProtein = recipeAPI.protein.slice(0,8)
        } else {
            _recipesCuisine = recipeData.hits.slice(0,8)
            _recipesTime = recipeData.hits.slice(0,8)
            _recipesProtein = recipeData.hits.slice(0,8)
        }

        const capitalize = word => {
            return word[0].toUpperCase() + word.slice(1, word.length)
        }


        return (
            // For now, Dashboard will recommend recipe based on your favorite protein, cuisine and time preference

            auth.id
            ?
            <div className = {classes.white}>
            <Nav history={history}/>
            <div className = {classes.navBarSpace}>
                <br/>
                <Typography variant = 'h6'>
                    Explore
                </Typography>
                <Typography variant = 'body1'>
                    Our picks for you are below.  Click on any recipe to get started.
                </Typography>
                {/* <Link to={'/recipe/create'} className = {classes.noUnderline}>
                <Button variant = 'outlined' color = 'primary' size = 'small'>
                    + Add a Recipe
                </Button>
                </Link> */}
                <br/>
                <Divider/>

                <Typography variant = 'h6'>
                    Our Top Forked Recipes
                </Typography>
                <Grid container spacing = {24}>
                { _recipesFavorite.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe.recipe} />
                    </Grid>
                ))}
                </Grid>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    {capitalize(auth.protein[0])} Recipes
                </Typography>
                <Grid container spacing = {24}>
                { _recipesCuisine.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe.recipe} />
                    </Grid>
                ))}
                </Grid>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    {capitalize(auth.cuisine[0])} Recipes
                </Typography>
                <Grid container spacing = {24}>
                { _recipesProtein.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe.recipe} />
                    </Grid>
                ))}
                </Grid>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    {auth.time} Recipes
                </Typography>
                <Grid container spacing = {24}>
                { _recipesTime.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe.recipe} />
                    </Grid>
                ))}
                </Grid>
                <br />
            </div>
            </div>
            :
            <div className = {classes.navBarSpace404}>
                <Nav/>
                <Typography variant = 'h6'>
                    fourohfour
                </Typography>

                <Link to='/' className = {classes.noUnderline}>
                    <Button variant = 'outlined' color = 'primary' size = 'small'>
                        Take me home
                    </Button>
                </Link>


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
    navBarSpace404: {
        marginTop: '70px',
        marginLeft: '15px',
      },
    white: {
        backgroundColor: 'white'
    },
    noUnderline: {
        textDecoration: 'none',
      },
});

const mapStateToProps = state => ({
    recipes: state.recipes,
    recipeAPI: state.recipeAPI,
    auth: state.auth,
    // userRecipes: state.recipes.filter()
    // authPreferences: __,
    // authRecipes: __,
})

const mapDispatchtoProps = ({ getAPIRecipes })

export default withStyles(styles)(connect(mapStateToProps, mapDispatchtoProps)(Dashboard))


