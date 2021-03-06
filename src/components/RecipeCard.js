import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { connect } from 'react-redux';
import { saveRecipe } from './../store/savedRecipes';
import { forkRecipe } from './../store/forkedRecipes';
import Recipe from './Recipe'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getLatestForkId} from './../utils';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { getAllUsers } from '../store/userStore.js'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  card: {
    maxWidth: 400,
    height: 350
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeCard extends Component {
  constructor(props) {
      super(props)
      this.state = {
          modalOpen: false,
          anchorEl: null
      }
      this.handleSave = this.handleSave.bind(this);
      this.handleFork = this.handleFork.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleClickEvent = this.handleClickEvent.bind(this);
      this.handlePopoverClose = this.handlePopoverClose.bind(this);
  }

  handleSave(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
    this.props.onSaveRecipe(this.props.recipe, this.props.userId);
  }

  handleFork() {
    this.props.onForkRecipe(this.props.recipe, this.props.userId);
    this.setState({ modalOpen: true });
  }

  handleClose(){
    this.setState({ modalOpen: false });
  };

  handlePopoverClose() {
    this.setState({
      anchorEl: null,
    });
  };

  handleClickEvent(){
    this.setState({ modalOpen: false });
  }

  render() {
    const { classes, recipe, latestFork, userId, users } = this.props;
    const { handleSave, handleFork, handleClickEvent, handleClose, handlePopoverClose } = this;
    const { modalOpen, anchorEl } = this.state;
    let avatarSymbol
    let recipeSplit
    let recipeId
    const open = Boolean(anchorEl);

    if (recipe.uri){
      recipeSplit = recipe.uri.split('#')
      recipeId = recipeSplit[1]
    } else {
      recipeId = this.props.recipe.id
    }

    let _author
    let _author_firstName
    let _author_lastName // THIS IS VERY VERY HACKY....
    if (recipe.source){
      avatarSymbol = recipe.source[0]
    } else if (recipe.createdBy){
      _author = users.filter(user => user.id === recipe.createdBy)
      if (_author[0]){
        avatarSymbol = _author[0].firstName[0]
        _author_firstName = _author[0].firstName
        _author_lastName = _author[0].lastName
      }
    }

    return (
      <Fragment>
      <Card className={classes.card}>
        <a href = 'true'>
        <Link to={`/recipe/${recipeId}`} style={{ textDecoration:'none' }}>
        <CardMedia
            className={classes.media}
            image = {recipe.image || recipe.img}
            onClick={() => <Recipe props={recipe}/>}
        />
        </Link>
        </a>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {avatarSymbol}
            </Avatar>
          }
          title = {recipe.label || recipe.title}
          subheader = { recipe.source || `${_author_firstName} ${_author_lastName}` }
        />
        <CardActions className={classes.actions} disableActionSpacing>
        {
          recipe.createdBy === userId ? null : (
            <div>
            <Tooltip TransitionComponent={Zoom} title="Save Recipe">
              <IconButton onClick={handleSave}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Popover
              id="simple-popper"
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.typography}>Recipe is saved to your Cookbook.</Typography>
            </Popover>
            </div>
          )
        }
          <Tooltip TransitionComponent={Zoom} title="Fork Recipe">
            <IconButton 
              aria-label="Fork Recipe"
              onClick={handleFork}
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
        </CardActions>
      </Card>
      </Fragment>
    );
  }
}

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const matchStateToProps = (state) => {
  return {
      userId: state.auth.id,
      latestFork: getLatestForkId(state.forkedRecipes),
      users: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onForkRecipe: (recipe, userId) => dispatch(forkRecipe(recipe, userId)),
    onSaveRecipe: (recipe, userId) => dispatch(saveRecipe(recipe, userId)),
    getAllUsers: () => dispatch(getAllUsers())
  };
};

export default connect(matchStateToProps, mapDispatchToProps)(withStyles(styles)(RecipeCard));