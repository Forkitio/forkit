import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getAllRecipes } from '../store/recipes.js'
import Nav from './Nav'
import RecipeCard from './RecipeCard'

class Ancestory extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getAllRecipes()
    }

    render(){
        // const recipeId =  '2f2ae84f-f3d1-4bd0-bb56-fb98053aeaf4'
        const { allRecipes, classes } = this.props
        let family
        let ancestoryId
        const recipeId = this.props.history.location.pathname.slice(6)

        if(recipeId){
            ancestoryId = allRecipes.filter(recipe => recipe.id == recipeId)[0].ancestoryId
        }

        if (ancestoryId){
            family = allRecipes.filter(recipe => 
                recipe.ancestoryId === ancestoryId || recipe.id === ancestoryId
            )
        } else {
            family = allRecipes.filter(recipe => 
                recipe.ancestoryId === recipeId ||
                recipe.id === recipeId
            )
        }

        const familyHead = family.filter(recipe => ancestoryId == null)[0]

        // const compareTimeCreated = (a,b) => {
        //     if (a.createdAt < b.createdAt){
        //         return -1
        //     } if (a.createdAt > b.createdAt){
        //         return 1
        //     }
        //     return 0
        // }

        family.sort(function(a,b){ return a.createdAt - b.createdAt})
        
        return (
            recipeId
            ?
            <Fragment>
                <Nav/>
                <div className = {classes.navBarSpace}>
                <Typography variant = 'h6'>
                    The OG {familyHead.title}
                </Typography>
                <br/>
                <Divider/>
                <Grid container spacing = {32}>
                {
                    family.map(recipe => (
                        <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe}/>
                        </Grid>
                    ))
                }
                </Grid>
                </div>
            </Fragment>
            :
            <div className = {classes.navBarSpace404}>
                <Nav/>
                <Typography variant = 'h6'>
                    fourohfour - did you log in?
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
    noUnderline: {
        textDecoration: 'none',
      },
});

const mapStateToProps = state => ({
    allRecipes: state.allRecipes
})

const mapDispatchToProps = ({ getAllRecipes })



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Ancestory))