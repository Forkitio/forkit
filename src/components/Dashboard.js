import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import RecipeCard from './RecipeCard'
import { Grid, Typography, Button, Divider, Avatar, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { getAPIRecipes, getOneAPIRecipe } from '../store/recipeAPI.js'
import { getAllUsers } from '../store/userStore.js'
import { getAllRecipes } from '../store/recipes.js'
import recipeData from './tempData'
import Nav from './Nav'
import {Link} from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite'



// To avoid having to call the recipe API everytime we reload as we have a limited number of calls we can use, I have created temporary recipe data to develop with.  To use real API data, change the constant below to be equal to 1 and make sure you create a file for the API keys I provided
const useTempData = 1

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.handleFollow.bind(this)
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

        this.props.getAllUsers()
        this.props.getAllRecipes()

        if (useTempData == 1 && auth.id){
            this.props.getAPIRecipes('cuisine', auth.protein[0])
            this.props.getAPIRecipes('protein', auth.cuisine[0])
            this.props.getAPIRecipes('time', _time)
        }

    }

    handleFollow(){
        console.log('following')
    }

    render () {
        const { classes, recipeAPI, auth, history, users, allRecipes } = this.props

        const { handleFollow } = this

        let _recipesCuisine
        let _recipesTime
        let _recipesProtein
        let _recipesFavorite = allRecipes.slice(0,8)

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
                    Our picks for you are below. Click on any person or recipe to get started.
                </Typography>
                <br/>
                <Divider/>

                <Typography variant = 'h6'>
                    Find some favorite people to follow
                </Typography>
                <div className = {classes.root}>
                <Grid container spacing = {16} >
                { users.map(user => (
                    <Grid item xs = {1} key = {user.id}>
                    <Link to = {`/user/${user.id}`} className = {classes.noUnderline}>
                    <Avatar
                        alt = {user.firstName}
                        src = {user.img}
                        className = {classes.avatar}
                    />
                    </Link>
                    <IconButton
                    aria-label = {`follow ${user.firstName}`}
                    onClick = {handleFollow}
                    className = {classes.iconStyle}
                    >
                        <div className = {classes.iconStyle}>
                            <FavoriteIcon color = 'primary'/>
                        </div>
                    </IconButton>
                    <Typography variant = 'caption' className = {classes.avatarName}>
                        {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    </Grid>
                ))
                }
                </Grid>
                </div>
                <br/>
                <Divider />

                <Typography variant = 'h6'>
                    Fork our most-forkable recipes
                </Typography>
                <br/>
                <Grid container spacing = {32}>
                { _recipesFavorite.map(recipe => (
                    <Grid item sm = {3} key = {recipe.id} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe}/>
                    </Grid>
                ))}
                </Grid>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    Because you said you like {capitalize(auth.protein[0])} recipes
                </Typography>
                <Grid container spacing = {32}>
                { _recipesCuisine.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.avatarGrid}>
                        <RecipeCard recipe = {recipe.recipe} />
                    </Grid>
                ))}
                </Grid>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    Because you said you liked {capitalize(auth.cuisine[0])} recipes
                </Typography>
                <Grid container spacing = {32}>
                { _recipesProtein.map(recipe => (
                    <Grid item sm = {3} key = {recipe.recipe.uri} className = {classes.spacing}>
                        <RecipeCard recipe = {recipe.recipe} />
                    </Grid>
                ))}
                </Grid>
                <br />
                <Divider/>

                <Typography variant = 'h6'>
                    Because you said you liked {auth.time} recipes
                </Typography>
                <Grid container spacing = {32}>
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
    avatar: {
        marginBottom: '0px',
        marginRight: '5px',
        marginLeft: '5px',
        marginTop: '10px',
        width: 100,
        height: 100,
    },
    root: {
        display: 'flex',
        flexGrow: 1
    },
    avatarName: {
        textAlign: 'center'
    },
    iconStyle: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '0px'
    }
});

const mapStateToProps = state => ({
    allRecipes: state.allRecipes,
    recipeAPI: state.recipeAPI,
    auth: state.auth,
    users: state.user.users.filter(user => user.id !== state.auth.id)
})

const mapDispatchtoProps = ({ getAPIRecipes, getOneAPIRecipe, getAllUsers, getAllRecipes })

export default withStyles(styles)(connect(mapStateToProps, mapDispatchtoProps)(Dashboard))


