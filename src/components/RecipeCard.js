import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { connect } from 'react-redux';
import { saveRecipe } from './../store/savedRecipes';
import { forkRecipe } from './../store/forkedRecipes';
import Recipe from './Recipe'

const styles = theme => ({
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
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleFork = this.handleFork.bind(this);
  }

  handleExpandClick() {
    this.setState({
      expanded: !this.state.expanded
    })
  };

  handleSave() {
    this.props.onSaveRecipe(this.props.recipe, this.props.userId);
  }

  handleFork() {
    this.props.onForkRecipe(this.props.recipe, this.props.userId);
  }

  render() {
    const { classes, recipe } = this.props;
    const { handlImageClick, handleExpandClick, handleSave, handleFork } = this;
    return (
      // <Link to={`/recipe/${recipe.label}`} style={{textDecoration: 'none'}}>
        <Card className={classes.card}>
          <a href='true'>
            <CardMedia
              className={classes.media}
              image={recipe.image}
              onClick={() => <Recipe props={recipe}/>}
            />
          </a>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {recipe.source[0]}
              </Avatar>
            }
            // action={
            //   <IconButton>
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={recipe.label}
            subheader={recipe.source}
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <Tooltip TransitionComponent={Zoom} title="Save Recipe">
              <IconButton aria-label="Save Recipe" onClick={handleSave}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="Fork Recipe">
              <IconButton
                aria-label="Fork Recipe"
                onClick={handleFork}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
            {/* <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick()}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
          </CardActions>
          {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              content
            </Typography>
          </CardContent>
        </Collapse> */}
        </Card>
      // </Link>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    userId: state.auth.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onForkRecipe: (recipe, userId) => dispatch(forkRecipe(recipe, userId)),
    onSaveRecipe: (recipe, userId) => dispatch(saveRecipe(recipe, userId))
  };
};

export default connect(matchStateToProps, mapDispatchToProps)(withStyles(styles)(RecipeCard));