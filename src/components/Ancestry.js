import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getAllRecipes } from '../store/recipes.js'
import Nav from './Nav'
import RecipeCard from './RecipeCard'

class Ancestry extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getAllRecipes()
    }

    render(){
        // const recipeId =  '2f2ae84f-f3d1-4bd0-bb56-fb98053aeaf4'
        const { allRecipes, classes, recipeId } = this.props
        let family
        let ancestryId
        let _recipe
        // const recipeId = this.props.history.location.pathname.slice(17)
        console.log(recipeId)

        if(recipeId.length && allRecipes.length){
            console.log(allRecipes)
            _recipe = allRecipes.filter(recipe => recipe.id === recipeId)[0]
            if (_recipe){
                ancestryId = _recipe.ancestoryId
            }
            console.log(_recipe)
            console.log(ancestryId)
        }

        if (ancestryId){
            family = allRecipes.filter(recipe => 
                recipe.ancestoryId === ancestryId || recipe.id === ancestryId
            )
        } else {
            family = allRecipes.filter(recipe => 
                recipe.ancestoryId === recipeId ||
                recipe.id === recipeId
            )
        }

        const familyHead = family.filter(recipe => recipe.parentId == null)[0]

        family.sort(function(a,b){ return a.createdAt - b.createdAt})
        console.log(family)
        
        return (
            recipeId.length
            ?
            <Fragment>
                <Nav/>
                <div className = {classes.navBarSpace}>
                <Typography variant = 'h6'>
                    The OG: {familyHead.title}
                </Typography>
                <br/>
                <Divider/>
                {/* <Grid container spacing = {32}> */}
                {
                    family.map(recipe => (
                        // <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                        <div>
                            <RecipeCard recipe = {recipe}/>
                            <br/>
                        </div>
                        // </Grid>
                    ))
                }
                {/* </Grid> */}
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



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Ancestry))