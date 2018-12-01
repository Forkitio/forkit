import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { Typography, Button, Divider, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import {getCreatedRecipes} from './../store/createdRecipes';
import {getSavedRecipes} from './../store/savedRecipes';
import {getForkedRecipes} from './../store/forkedRecipes';
import RecipeCard from './RecipeCard'
import Nav from './Nav'

class Cookbook extends Component {

    componentDidMount(){
        const { id } = this.props.auth
        this.props.loadSavedRecipes(id)
        this.props.loadForkedRecipes(id)
        this.props.loadCreatedRecipes(id)
    }

    render () {
        const { classes, history, auth, createdRecipes, forkedRecipes, savedRecipes } = this.props;

        return(
            auth.id
            ?
            <div className = {classes.white}>
                <Nav history={history}/>
                <div className = {classes.navBarSpace}>
                    <Typography variant = 'h6'>
                        My Cookbook
                    </Typography>
                    <br/>

                    <Link to={'/recipe/create'} className = {classes.noUnderline}>
                        <Button variant = 'outlined' color = 'primary' size = 'small'>
                            + Add a recipe
                        </Button>
                    </Link>
                    <br/>
                    <br/>
                    <Divider />

                    <Typography variant = 'h6'>
                        My Created Recipes
                    </Typography>

                    {
                        createdRecipes.length
                        ? 
                        <Grid container spacing = {24}>
                            {createdRecipes.map(recipe => (
                            <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                                <RecipeCard recipe = {recipe} author = {auth} />
                            </Grid>
                            ))}
                        </Grid>
                        :
                        <Typography variant = 'body1'>
                            Add a recipe - click the button above, or below, any of them will do!
                        <br />
                        <br />
                        <Link to={'/recipe/create'} className = {classes.noUnderline}>
                            <Button variant = 'outlined' color = 'primary' size = 'small'>
                                + You can also add a recipe here
                            </Button>
                        </Link>
                        </Typography>
                    }
                    <br />
                    <Divider/>

                    <Typography variant = 'h6'>
                        My Forked Recipes
                    </Typography>
                    {
                        forkedRecipes.length
                        ? 
                        <Grid container spacing = {24}>
                            {createdRecipes.map(recipe => (
                            <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                                <RecipeCard recipe = {recipe} author = {auth} />
                            </Grid>
                            ))}
                        </Grid>
                        :
                        <Typography variant = 'body1'>
                            Go out there and explore, fork a few recipes!
                            <br />
                            <br />
                            <Link to={'/user/dashboard'} className = {classes.noUnderline}>
                                <Button variant = 'outlined' color = 'primary' size = 'small'>
                                    I'm ready for an adventure!
                                </Button>
                            </Link>

                        </Typography>
                    }

                    <br />
                    <Divider/>

                    <Typography variant = 'h6'>
                        My Saved Recipes
                    </Typography>

                        {
                        forkedRecipes.length
                        ? 
                        <Grid container spacing = {24}>
                            {createdRecipes.map(recipe => (
                            <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                                <RecipeCard recipe = {recipe} author = {auth} />
                            </Grid>
                            ))}
                        </Grid>
                        :
                        <Typography variant = 'body1'>
                            We believe in you - you can find one recipe to like!
                            <br />
                            <br />
                            <Link to={'/user/dashboard'} className = {classes.noUnderline}>
                                <Button variant = 'outlined' color = 'primary' size = 'small'>
                                    I believe in myself!
                                </Button>
                            </Link>

                        </Typography>
                    }
                    
                    <br />
                    <Divider/>


                </div>
            </div>
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        createdRecipes: state.createdRecipes,
        forkedRecipes: state.forkedRecipes,
        savedRecipes: state.savedRecipes
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
