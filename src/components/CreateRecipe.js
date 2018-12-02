import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addCreatedRecipe } from './../store/createdRecipes';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Nav from './Nav';
import {getLatestCreatedId, getAllDietLables, getAllHealthLables} from './../utils';

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

class CreateRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {
        title: '',
        directions: '',
        ingredients: [],
        time: 0,
        serving: 0,
        healthLabels: [],
        dietLabels: [],
        img: ''
      },
      success: '',
      error: '',
      tempIngredients: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChipSelect = this.handleChipSelect.bind(this);
    this.handleChipDeSelect = this.handleChipDeSelect.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
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

  handleChange(event) {
    const recipe = Object.assign({}, this.state.recipe, {
      [event.target.name]: event.target.value,
    });
    this.setState({ recipe });
  };

  handleIngredientsChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    const { onAddRecipe, userId, history } = this.props;

    const { recipe } = this.state;
    // created recipe should not have ancestor and parent
    recipe.ancestoryId = null;
    recipe.parentId = null;
    recipe.createdBy = userId;

    recipe.ingredients = this.state.tempIngredients.split(',')

    event.preventDefault();
    onAddRecipe(recipe, userId, history).then(() => {
      this.setState({ success: 'Recipe added successfully!' });
      this.setState({
        recipe: {
          title: '',
          directions: '',
          ingredients: [],
          time: 0,
          serving: 0,
          healthLabels: [],
          dietLabels: [],
          img: ''
        },
        error: ''
      });
    })
      .catch(ex => this.setState({ error: `An error has occurred. ${ex}`, success: '' }));
  }

  render() {
    const { classes, latestCreated, allDietLables, allHealthLabels } = this.props;
    const { handleChange, handleSubmit, handleChipSelect, handleChipDeSelect, handleIngredientsChange } = this;
    const { success, error, tempIngredients } = this.state;
    const {
      title,
      directions,
      time,
      serving,
      healthLabels,
      dietLabels,
      img
    } = this.state.recipe;
    const healthLabelsIndexes = healthLabels.map(el => el.key);
    const dietLabelsIndexes = dietLabels.map(el => el.key);
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
                Create your own recipe
              </Typography>
              <Typography variant="subtitle1" gutterBottom style={{textAlign: 'center'}}>
                      Fill in the form below and make some magic happen!
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
                  name="img"
                  label="Image"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={img}
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
                  value={directions}
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
                  name="tempIngredients"
                  label="Ingredients"
                  margin="normal"
                  variant="outlined"
                  onChange={handleIngredientsChange}
                  value={tempIngredients}
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
                  size = 'large'
                >
                  Create Recipe
                </Button>
                </div>
              </form>
            </Paper>
          </div>
        </Grid>
      </Fragment>
    );
  }
}

CreateRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

const matchStateToProps = (state, {history}) => {
  return {
    userId: state.auth.id,
    latestCreated: getLatestCreatedId(state.createdRecipes),
    allHealthLabels: getAllHealthLables(),
    allDietLables: getAllDietLables(),
    history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: (recipe, userId, history) => dispatch(addCreatedRecipe(recipe, userId, history)),
  };
};

export default connect(matchStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRecipe));

