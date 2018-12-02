import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Nav from './Nav'
import Ancestry from './Ancestry'
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
import { getAllUsers } from '../store/userStore.js'
import { strToArr } from '../utils.js'

import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { saveRecipe } from './../store/savedRecipes';
import { forkRecipe } from './../store/forkedRecipes';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getLatestForkId} from './../utils';

const styles = theme => ({
    typography: {
      margin: theme.spacing.unit * 2,
    }
  });

class Recipe extends Component {
    constructor() {
        super()
        this.state = {
            modalOpen: false
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleFork = this.handleFork.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id
        if (recipeId.length === 39){
            this.props.getOneAPIRecipe(recipeId)
        } else {
            this.props.getAllRecipes()
            this.props.getAllUsers()
        }
    }

    handleSave(recipe) {
        this.props.onSaveRecipe(recipe, this.props.userId);
      }
    
      handleFork(recipe) {
        this.props.onForkRecipe(recipe, this.props.userId);
        this.setState({ modalOpen: true });
      }
    
      handleClose(){
        this.setState({ modalOpen: false });
      };
    
      handleClickEvent(){
        this.setState({ modalOpen: false });
      }

    render() {
        const { recipe, allRecipes, users, userId, classes, latestFork } = this.props
        const recipeId = this.props.match.params.id
        let title, source, time, healthLabels, calories, ingredient, img, directions, _recipe, author, finalRecipe
        const { handleSave, handleFork, handleClickEvent, handleClose, handlePopoverClose } = this;
        const { modalOpen } = this.state;

        if (recipeId.length === 39) {
            title = recipe.label
            source = recipe.source
            time = recipe.totalTime
            healthLabels = recipe.healthLabels
            calories = Math.floor(recipe.calories)
            ingredient = recipe.ingredientLines
            img = recipe.image
            directions = ''
            finalRecipe = recipe;
        } else if (allRecipes.length){
            _recipe = allRecipes.filter(recipe => recipe.id === this.props.match.params.id)[0]
            console.log(_recipe)
            title = _recipe.title
            directions = _recipe.directions
            ingredient = _recipe.ingredients
            time = _recipe.time
            img = _recipe.img
            author = users.filter(user => user.id === _recipe.createdBy)[0]
            source = author.firstName + ' ' + author.lastName
            calories = 'calories not available yet'
            healthLabels = _recipe.healthLabels
            finalRecipe = _recipe;
        }

        const recipeDirectionsArr = strToArr(directions)

        // const healthLabels = recipe ? recipe.healthLabels : null
        // const totalTime = recipe ? recipe.totalTime : null
        console.log('!', finalRecipe)
        return (
            <Fragment>
                <Nav />
                <div style={{ display: 'flex' }}>
                    <div style={{ marginTop: '100px', marginLeft: '300px', width: '660px' }}>
                        <Link to='/user/dashboard' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontFamily: 'arial' }}>
                            ← All Recipes
                        </Link>
                        <div>
                            {
                            recipe.createdBy === userId ? null : (
                                <Tooltip TransitionComponent={Zoom} title="Save Recipe">
                                <IconButton aria-label="Save Recipe" onClick={() => {
                                    return handleSave(finalRecipe)}}>
                                    <FavoriteIcon />
                                </IconButton>
                                </Tooltip>
                            )
                            }
                            <Tooltip TransitionComponent={Zoom} title="Fork Recipe">
                                <IconButton 
                                aria-label="Fork Recipe"
                                onClick={() => {
                                    return handleFork(finalRecipe)}}
                                >
                                <ShareIcon />
                                </IconButton>
                                </Tooltip>
                                <Dialog
                                open={modalOpen}
                                onClose={this.handleClose}
                                aria-labelledby="responsive-dialog-title"
                                >
                                <DialogTitle id="responsive-dialog-title">{"Edit Recipe?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    Your recipe has been successfully forked to your cookbook. 
                                    Would you like to edit that recipe?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary" autoFocus>
                                    Look for more recipes
                                    </Button>
                                    <Button onClick={handleClickEvent} color="primary" href={`/#/recipe/edit/${latestFork}`}>
                                    Take me to the Fork
                                    </Button>
                                </DialogActions>
                                </Dialog>
                            </div>
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
                                if (typeof label === 'string'){
                                    return (
                                        <Chip label={label} color='secondary' style={{ marginRight: '10px' }} key = {label} />
                                    )
                                }
                            }) : null
                        }
                        <br />
                        <br />
                        <img src={img} style={{ height: '400px' }}></img>
                        <br />
                        <br />
                        <Typography variant='subtitle1'>

                        </Typography>
                        
                        {
                            recipeId.length == 36?
                            <Link to = {`/recipe/ancestry/${recipeId}`}>
                                <Button>
                                    Ancestry
                                </Button>
                            </Link>
                            :
                            null
                        }

                        <Typography variant='subtitle1'>
                            <Whatshot />Calories: {calories}
                        </Typography>

                        <br />

                        <Typography variant='h6'>
                            Ingredients
                        </Typography>

                        <SayButton onClick={(evt) => console.log(evt)} speak={ingredient || 'Sorry my voice is gone'}>
                            Hear the ingredients
                        </SayButton>

                        <ol>
                            {ingredient ? ingredient.map((ing, idx) => {
                                return (
                                    <Typography variant='subtitle1' key={idx + 1}>
                                        <li> {ing} </li>
                                    </Typography>
                                )
                            }): null}
                        </ol>

                        <Typography variant='h6'>
                            Directions
                        </Typography>

                        <SayButton onClick={(evt) => console.log(evt)} speak={recipeDirectionsArr || 'Sorry my voice is gone'} voice={ voices => [].find.call(voices, v => v.lang === 'en-GB')}>
                            Hear all the directions at once
                        </SayButton>

                        <ol>
                            {
                                recipeDirectionsArr.map((step, idx) => {
                                    return (
                                        <Fragment key={idx + 1}>
                                            <Typography variant='subtitle1' >
                                                <li>{step}</li>
                                            </Typography>
                                            <SayButton speak={step}>
                                                Hear individual step
                                            </SayButton>
                                        </Fragment>
                                    )
                                })
                            }
                        </ol>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <div style={{ marginTop: '100px', marginRight: '300px', width: '500px' }}>
                            <ExpansionPanel elevation={0}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} elevation={0}>
                                    <Typography variant='subtitle1' style={{fontWeight: 'bold'}}> Recipe Forks </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Here are the different Forks of this recipe
                                        <Divider/>
                                        {
                                            _recipe
                                            ?
                                            <Ancestry recipeId = {recipeId}/>
                                            :
                                            'No one has forked this recipe yet'
                                        }
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

Recipe.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state, { match }) => {
    const recipe = state.recipeAPI.selectedRecipe
    return {
        match,
        recipe: recipe,
        allRecipes: state.allRecipes,
        users: state.user.users,
        userId: state.auth.id,
        latestFork: getLatestForkId(state.forkedRecipes),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onForkRecipe: (recipe, userId) => dispatch(forkRecipe(recipe, userId)),
      onSaveRecipe: (recipe, userId) => dispatch(saveRecipe(recipe, userId)),
      getOneAPIRecipe: (id) => dispatch(getOneAPIRecipe(id)),
      getAllRecipes: () => dispatch(getAllRecipes()),
      getAllUsers: () => dispatch(getAllUsers())
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Recipe))
