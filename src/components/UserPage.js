import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import { Typography, Button, Divider, Grid, Avatar, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import AddIcon from '@material-ui/icons/Add'
import {getCreatedRecipes} from './../store/createdRecipes';
import {getSavedRecipes} from './../store/savedRecipes';
import {getForkedRecipes} from './../store/forkedRecipes';
import {getUser} from './../store/userStore';
import RecipeCard from './RecipeCard'
import Nav from './Nav'

class UserPage extends Component {

    componentDidMount(){
        const id = this.props.history.location.pathname.slice(6)
        
        this.props.getUser(id)
        this.props.loadSavedRecipes(id)
        this.props.loadForkedRecipes(id)
        this.props.loadCreatedRecipes(id)
    }

    render () {
        const { classes, history, auth, createdRecipes, forkedRecipes, savedRecipes, user } = this.props;

        return(
            auth.id
            ?
            <div className = {classes.white}>
                <Nav history={history}/>
                <div className = {classes.navBarSpace}>
                    <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 
                    'bottom'}}>
                        <Avatar
                            alt = {user.firstName}
                            src = {user.img}
                            className = {classes.avatar}
                        />
                        <Typography variant = 'h6' className = {classes.textbottom}>
                            {user.firstName}'s Cookbook
                        <IconButton 
                        aria-label = {`follow ${user.firstName}`}
                        // onClick = {handleFollow}
                        >
                            <FavoriteIcon color = 'primary'/>
                        </IconButton>
                        </Typography>
                    </div>
                    <Divider />
                    <br/>

                    <Typography variant = 'h6'>
                        <AddIcon />
                        {user.firstName}'s Created Recipes
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
                        <ShareIcon fontSize = 'small'/>
                        {user.firstName}'s forked recipes
                    </Typography>
                    {
                        forkedRecipes.length
                        ? 
                        <Grid container spacing = {24}>
                            {forkedRecipes.map(recipe => (
                            <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                                <RecipeCard recipe = {recipe} author = {auth} />
                            </Grid>
                            ))}
                        </Grid>
                        :
                        <Typography variant = 'body1'>
                            No saved recipes

                        </Typography>
                    }

                    <br />
                    <Divider/>

                    <Typography variant = 'h6'>
                        <FavoriteIcon fontSize = 'small'/>
                        {user.firstName}'s saved recipes
                    </Typography>

                        {
                        savedRecipes.length
                        ? 
                        <Grid container spacing = {24}>
                            {savedRecipes.map(recipe => (
                            <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                                <RecipeCard recipe = {recipe} author = {auth} />
                            </Grid>
                            ))}
                        </Grid>
                        :
                        <Typography variant = 'body1'>
                            {user.firstName} hasn't liked any recipes yet
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
      marginTop: '60px',
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
    avatar: {
        marginBottom: '10px',
        marginRight: '5px',
        marginLeft: '5px',
        marginTop: '30px',
        width: 150,
        height: 150,
    },
    textbottom: {
       marginTop: 150
    },
});

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        createdRecipes: state.createdRecipes,
        forkedRecipes: state.forkedRecipes,
        savedRecipes: state.savedRecipes,
        user: state.user.user
    }
  }
  

const mapDispatchToProps = dispatch => {
    return {
      loadSavedRecipes: (userId) => dispatch(getSavedRecipes(userId)),
      loadForkedRecipes: (userId) => dispatch(getForkedRecipes(userId)),
      loadCreatedRecipes: (userId) => dispatch(getCreatedRecipes(userId)),
      getUser: (userId) => dispatch(getUser(userId))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserPage))
