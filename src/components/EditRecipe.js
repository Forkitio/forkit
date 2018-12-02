import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { updateRecipe, deleteRecipe } from './../store/createdRecipes';
import { updateForkedRecipe } from './../store/forkedRecipes';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { getRecipeById, getAllHealthLables, getAllDietLables } from './../utils';
import { withStyles } from '@material-ui/core/styles';
import Nav from './Nav';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing.unit / 2,
    },
    chip: {
      margin: theme.spacing.unit / 2,
    },
});

class EditRecipe extends Component {
    constructor(props) {
    super(props);
    this.state = {
        recipe: {
        title: '',
        directions: '',
        ingredients: [],
        time: 0,
        serving: 0,
        healthLabels: [],
        dietLabels: [],
        image: ''
        },
        success: '',
        error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChipDeSelect = this.handleChipDeSelect.bind(this);
    this.handleChipSelect = this.handleChipSelect.bind(this);
  }

  componentDidMount() {
    const { recipe } = this.props;
    this.setState({ recipe });
  }
  
  componentDidUpdate(prevProps) {
    const { recipe } = this.props;

    if(prevProps !== this.props) {
      this.setState({ recipe })
    }
  }

  handleChange(event) {
    const recipe = Object.assign({}, this.state.recipe, {
      [event.target.name]: event.target.value,
    });
    this.setState({ recipe });
  }

  handleSubmit(event) {
    const { onUpdateRecipe } = this.props;
    const { recipe } = this.state;

    event.preventDefault();
    onUpdateRecipe(recipe).then(() => {
      this.setState({ success: 'Recipe updated successfully!' });
    });
  }

  handleDelete(recipe) {
    const { onDeleteRecipe } = this.props;
    onDeleteRecipe(recipe);
  }

  handleChipSelect(data, isHealthChip) {
      if(isHealthChip){
        const healthLabels = [...this.state.recipe.healthLabels, data];
        this.setState(this.state.recipe.healthLabels = healthLabels)
      }
      const dietLabels = [...this.state.recipe.dietLabels, data];
      this.setState(this.state.recipe.dietLabels = dietLabels)
  };

  handleChipDeSelect(data, isHealthChip) {
      if(isHealthChip){
        const healthLabels = [...this.state.recipe.healthLabels];
        const chipToDelete = healthLabels.indexOf(data);
        healthLabels.splice(chipToDelete, 1);
        this.setState(this.state.recipe.healthLabels = healthLabels)
      }
      const dietLabels = [...this.state.recipe.dietLabels];
      const chipToDelete = dietLabels.indexOf(data);
      dietLabels.splice(chipToDelete, 1);
      this.setState(this.state.recipe.dietLabels = dietLabels)
  };

  render() {
    const { handleChange, handleSubmit, handleDelete, handleChipDeSelect, handleChipSelect } = this;
    const { recipe, success, error } = this.state;
    const {
        title,
        directions,
        ingredients,
        time,
        serving,
        healthLabels,
        dietLabels,
        image
    } = this.state.recipe;
    const { classes, allHealthLabels, allDietLables } = this.props;
    const healthLabelsIndexes = healthLabels.map(el => el.key);
    const dietLabelsIndexes = dietLabels.map(el => el.key);
    if(!recipe.title || recipe.title === '') {
      return null
    }

    return (
        <Fragment>
        <Grid container justify="center" display="flex" style={{marginTop:'100px'}}>
          <div>
            <Nav />
            <Paper
              elevation={1}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '25px',
                width: '800px',
              }}
            >
            <Typography variant="h4" gutterBottom style={{textAlign: 'center', fontWeight:'bold'}}>
                Edit your recipe
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{textAlign: 'center'}}>
                Let's spice it up!
            </Typography>

              <Typography
                variant="h6"
                style={{ color: 'green', marginLeft: '50px' }}
                gutterBottom
              >
                {success}
              </Typography>

              <Typography
                variant="h6"
                style={{ color: 'red', marginLeft: '50px' }}
                gutterBottom
              >
                {error}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  type="url"
                  name="image"
                  label="Image"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={image}
                  style={{ width: '800px' }}
                />

                <TextField
                  required
                  name="title"
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={title}
                  style={{ width: "800px" }}
                />

                <TextField
                  label="Steps"
                  multiline
                  name="directions"
                  rowsMax="100"
                  value={directions? directions: ''}
                  onChange={handleChange}
                  style={{ width: '800px' }}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  required
                  type="number"
                  step="1"
                  name="serving"
                  placeholder="0"
                  min="1"
                  label="Serving size"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={serving}
                  style={{ width: '200px' }}
                />

                <TextField
                  name="time"
                  type="number"
                  step="0.1"
                  placeholder="0 hours"
                  min="0"
                  label="Time to Cook (in hours)"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={time}
                  style={{ width: '200px' }}
                />
                <TextField
                  name="Ingredient"
                  label="Ingredients"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ingredients}
                  style={{ width: '800px' }}
                />
                <Typography variant="subtitle1" gutterBottom style={{textAlign: 'left'}}>
                Health Labels:
                </Typography>

                <Paper className={classes.root}>
                    {allHealthLabels.map(data => {
                        if(healthLabelsIndexes.includes(data.key)){
                            return (
                                <Chip
                                className={classes.chip}
                                color="primary"
                                key={data.key}
                                label={data.label}
                                onClick={() => handleChipDeSelect(data, true)}
                                variant="outlined"
                                />
                            );
                        }
                        return (
                            <Chip
                            key={data.key}
                            label={data.label}
                            onClick={() => handleChipSelect(data, true)}
                            className={classes.chip}
                            />
                        );
                    })}
                </Paper>

                <Typography variant="subtitle1" gutterBottom style={{textAlign: 'left'}}>
                Diet Labels:
                </Typography>

                <Paper className={classes.root}>
                    {allDietLables.map(data => {
                        if(dietLabelsIndexes.includes(data.key)){
                            return (
                                <Chip
                                className={classes.chip}
                                color="primary"
                                key={data.key}
                                label={data.label}
                                onClick={() => handleChipDeSelect(data, false)}
                                variant="outlined"
                                />
                            );
                        }
                        return (
                            <Chip
                            key={data.key}
                            label={data.label}
                            onClick={() => handleChipSelect(data, false)}
                            className={classes.chip}
                            />
                        );
                    })}
                </Paper>
                <div style={{ textAlign: 'center' }}>
                <br/>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ width: '200px' }}
                    >
                    Submit
                    </Button>
                    {
                        recipe.ancestoryId ? null : (
                            <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            style={{ width: '200px', marginLeft: '10px' }}
                            onClick={() => handleDelete(recipe)}
                            >
                                Delete Recipe
                                <DeleteIcon />
                            </Button>
                        )
                    }
                </div>
              </form>
            </Paper>
          </div>
        </Grid>
      </Fragment>
      );
  }
}

EditRecipe.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = ({ forkedRecipes, createdRecipes }, { match }) => {
    const id = match.params.id;
    const editableRecipes = forkedRecipes.concat(createdRecipes)
    return {
        recipe: getRecipeById(editableRecipes, id),
        allHealthLabels: getAllHealthLables(),
        allDietLables: getAllDietLables()
    };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    onUpdateRecipe: (recipe) => {
        if(recipe.ancestoryId){
            return dispatch(updateForkedRecipe(recipe))
        }
        return dispatch(updateRecipe(recipe))
    },
    onDeleteRecipe: recipe => dispatch(deleteRecipe(recipe, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditRecipe));
