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






class Recipe extends Component {
    constructor() {
        super()
    }

    componentDidMount(){
        this.props.getOneAPIRecipe(this.props.match.params.id)
        console.log(this.props.match.params.id)
        console.log(this.props.recipe)
    }

    render() {
        const { recipe } = this.props
        return (
            <Fragment>
                <Nav/>
                <div style = {{ display : 'flex'}}>
                <div style={{marginTop: '100px', marginLeft:'300px', width: '660px'}}>
                <Link to='/user/dashboard' style={{textDecoration: 'none', color: 'black', fontWeight: 'bold', fontFamily: 'arial'}}>
                ← All Recipes
                </Link>
                <br/>
                <br/>
                <Typography variant='h4'>
                   { recipe ? recipe.label : ''}
                </Typography>
                <Typography variant='subtitle1'>
                    By { recipe ? recipe.source : ''}
                </Typography>
                {
                    recipe.healthLabels ? recipe.healthLabels.map( label => {
                        return (
                            <Chip label={label} color='secondary' style={{marginRight: '10px'}}/>
                        )
                    }) : null
                }
                <br/>
                <br/>
                <img src={recipe ? recipe.image : null} style={{height: '400px'}}></img>
                <br/>
                <br/>
                <Typography variant='subtitle1'>
                    <Schedule/>Time: {recipe.totalTime ? recipe.totalTime : null} hours
                </Typography>
                <Typography variant='subtitle1'>
                    <Whatshot/>Calories: {recipe.calories ? recipe.calories : null} calories
                </Typography>
                <br/>
                <Typography variant='h6'>
                    Ingredients
                </Typography>
                <ol>
                    { recipe.ingredientLines ? recipe.ingredientLines.map( ing => {
                        return (
                            <Typography variant='subtitle1'>
                                <li> {ing} </li>
                            </Typography>
                        )
                    }) : ''}
                </ol>
                { recipe.directions ? 
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
            <div style={{backgroundColor: 'white', marginTop: '100px', marginLeft:'300px', width: '600px', height: '500px'}}>
            <Typography variant='h6'>
                    Nutritional Information
                </Typography>
                <Typography variant='h6'>
                   { recipe.digest ? recipe.digest.map(digest => {
                       return (
                           <li>{digest.label} {digest.total}</li>
                       )
                   }): null}
                </Typography>
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