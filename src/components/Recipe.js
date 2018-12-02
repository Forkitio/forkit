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



class Recipe extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getOneAPIRecipe(this.props.match.params.id)
        console.log(this.props.match.params.id)
        console.log(this.props.recipe)
    }

    render() {
        const { recipe } = this.props
        let title, source, time, healthLabels, calories, ingredient, img, directions
        if (recipe.uri) {
            title = recipe.label
            source = recipe.source
            time = recipe.totalTime
            healthLabels = recipe.healthLabels
            calories = recipe.calories
            ingredient = recipe.ingredientLines
            img = recipe.image
            directions = ''
        } else {
            title = recipe.title
            directions = recipe.directions
            ingredient = recipe.ingredients
            time = recipe.time
            img = recipe.img
            directions = recipe.directions
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
                        <img src={recipe ? recipe.image : null} style={{ height: '400px' }}></img>
                        <br />
                        <br />
                        <Typography variant='subtitle1'>


                        </Typography>
                        <Typography variant='subtitle1'>
                            <Whatshot />Calories: {recipe.calories ? Math.floor(recipe.calories) : null} calories
                </Typography>
                        <br />
                        <Typography variant='h6'>
                            Ingredients
                        </Typography>
                        <SayButton onClick={(evt) => console.log(evt)} speak={recipe.ingredientLines || 'Sorry my voice is gone'}>
                            Hear the ingredients
                        </SayButton>
                        <ol>
                            {recipe.ingredientLines ? recipe.ingredientLines.map(ing => {
                                return (
                                    <Typography variant='subtitle1'>
                                        <li> {ing} </li>
                                    </Typography>
                                )
                            }) : ''}
                        </ol>
                        {recipe.directions ?
                            <div>
                                <Typography variant='h6'>
                                    Directions
                </Typography>
                                {recipe.directions}
                            </div>
                            :
                            null
                        }
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
                                {recipe.digest ? recipe.digest.slice(0,10).map(digest => {
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
        recipe: recipe
    }
}

const mapDispatchToProps = ({ getOneAPIRecipe })


export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
