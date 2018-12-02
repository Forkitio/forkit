import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Nav from './Nav'
import recipeAPIReducer, { getAPIRecipes, getOneAPIRecipe } from '../store/recipeAPI.js'
import Chip from '@material-ui/core/Chip';
import Schedule from '@material-ui/icons/Schedule';
import Whatshot from '@material-ui/icons/Whatshot';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SayButton } from 'react-say'
import { getAllRecipes } from '../store/recipes.js'

class Recipe extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id

        if (recipeId.length == 39){
            this.props.getOneAPIRecipe(this.props.match.params.id)
            console.log(this.props.match.params.id)
            console.log(this.props.recipe)
        } else {
            this.props.getAllRecipes()
        }
    }

    render() {
        const { recipe, allRecipes } = this.props
        const recipeId = this.props.match.params.id
        let title, source, time, healthLabels, calories, ingredient, img, directions, _recipe

        console.log(recipeId)

        if (recipeId.length == 39) {
            title = recipe.label
            source = recipe.source
            time = recipe.totalTime
            healthLabels = recipe.healthLabels
            calories = recipe.calories
            ingredient = recipe.ingredientLines
            img = recipe.image
            directions = ''
        } else {
            _recipe = allRecipes.filter(recipe => recipe.id === this.props.match.params.id)[0]
            title = _recipe.title
            directions = _recipe.directions
            ingredient = _recipe.ingredients
            time = _recipe.time
            img = _recipe.img
        }
        // const healthLabels = recipe ? recipe.healthLabels : null
        // const totalTime = recipe ? recipe.totalTime : null
        return (
            <Fragment>
                <Nav />
                <div style={{ display: 'flex' }}>
                    <div style={{ marginTop: '100px', marginLeft: '300px', width: '660px' }}>
                        <Link to='/user/dashboard' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontFamily: 'arial' }}>
                            ← All Recipes
                </Link>
                        <br />
                        <br />
                        <Typography variant='h4'>
                            {/* {recipe ? recipe.label : ''} */}
                            {title}
                        </Typography>
                        <Typography variant='subtitle1'>
                            {/* By {recipe ? recipe.source : ''} */}
                            By {source}
                        </Typography>
                        {
                            healthLabels ? healthLabels.map(label => {
                                return (
                                    <Chip label={label} color='secondary' style={{ marginRight: '10px' }} />
                                )
                            }) : null
                        }
                        <br />
                        <br />
                        <img src={img} style={{ height: '400px' }}></img>
                        <br />
                        <br />
                        <Typography variant='subtitle1'>
                        </Typography>

                        <Typography variant='subtitle1'>
                            <Whatshot />Calories: {recipe ? Math.floor(recipe.calories) : null} calories
                        </Typography>

                        <br />

                        <Typography variant='h6'>
                            Ingredients
                        </Typography>

                        <SayButton onClick={(evt) => console.log(evt)} speak={ingredient || 'Sorry my voice is gone'}>
                            Hear the ingredients
                        </SayButton>

                        <ol>
                            {ingredient ? ingredient.map(ing => {
                                return (
                                    <Typography variant='subtitle1'>
                                        <li> {ing} </li>
                                    </Typography>
                                )
                            }): null}
                        </ol>
                            <div>
                                <Typography variant='h6'>
                                    Directions
                                </Typography>
                                <Typography variant='subtitle1'>
                                    {directions}
                                </Typography>
                            </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <div style={{ marginTop: '100px', marginRight: '300px', width: '500px' }}>
                            <ExpansionPanel elevation={0}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} elevation={0}>
                                    <Typography variant='subtitle1' style={{fontWeight: 'bold'}}> Recipe Versions </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Here are the different versions
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>

                        <div style={{ backgroundColor: 'white', marginTop:'50px', marginRight: '300px', width: '460px', height: '500px', padding: '20px' }}>
                            <div>
                                <Typography variant='h6'>
                                    Nutritional Information
                                </Typography>
                                <hr />
                            </div>
                            <Typography variant='subtitle1'>
                                {recipe && recipe.digest ? recipe.digest.slice(0,10).map(digest => {
                                    return (
                                        <p> {digest.label} {Math.floor(digest.total)} </p>
                                    )
                                }) : null}
                            </Typography>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, { match }) => {
    const recipe = state.recipeAPI.selectedRecipe
    return {
        match,
        recipe: recipe,
        allRecipes: state.allRecipes
    }
}

const mapDispatchToProps = ({ getOneAPIRecipe, getAllRecipes })


export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
