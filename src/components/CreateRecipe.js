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
        image: ''
      },
      success: '',
      error: '',
      chipData: [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'React' },
        { key: 3, label: 'Vue.js' }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChipSelect = this.handleChipSelect.bind(this);
  }

  

  handleChipSelect(data) {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  handleChange(event) {
    const recipe = Object.assign({}, this.state.recipe, {
      [event.target.name]: event.target.value,
    });
    this.setState({ recipe });
  }

  handleSubmit(event) {
    const { onAddRecipe, userId } = this.props;
    const { recipe } = this.state;
    // created recipe should not have ancestor and parent
    recipe.ancestoryId = null;
    recipe.parentId = null;
    recipe.createdBy = userId;

    event.preventDefault();
    onAddRecipe(recipe).then(() => {
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
            image: ''
        },
        error: '',
        chipData: [
          { key: 0, label: 'Angular' },
          { key: 1, label: 'jQuery' },
          { key: 2, label: 'React' },
          { key: 3, label: 'Vue.js' }
        ]
        });
    })
    .catch(ex => this.setState({ error: `An error has occurred. ${ex}`, success: '' }));
  }

  render() {
    const { classes } = this.props;
    const { handleChange, handleSubmit, handleChipSelect } = this;
    const { success, error, chipData } = this.state;
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
    console.log('!!!', chipData)
    return (
      <Fragment>
          <div>
        <Typography variant="h4" gutterBottom style={{ color: '#FF3B4A', marginLeft: '50px' }}>
          Create Your Own Recipe
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

        <br />

        <form onSubmit={handleSubmit}>
          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '1000px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '1000px' }}
            >
              <Grid item>
               <Typography
                variant="subheading"
                style={{ color: 'red' }}
                gutterBottom
                >
                Image:
                </Typography>
                <TextField
                  required
                  type="url"
                  name="image"
                  label="image"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={image}
                  style={{ width: '900px' }}
                />
              </Grid>

            <Grid item>
                <Typography
                variant="subheading"
                style={{ color: 'red' }}
                gutterBottom
                >
                Title:
                </Typography>
              <TextField
                required
                name="title"
                label="title"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ title }
                style={{ width: "900px" }}
              />
            </Grid>
            </Grid>
          </Paper>

          <br />

          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '1000px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '1000px' }}
            >
              <Grid item>
                <Typography
                variant="subheading"
                style={{ color: 'red' }}
                gutterBottom
                >
                Steps to Follow:
                </Typography>
                <TextField
                label="Steps"
                multiline
                name="directions"
                rowsMax="100"
                value={ directions }
                onChange={handleChange}
                style={{ width: '900px' }}
                margin="normal"
                variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>

          <br />

          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '1000px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '1000px' }}
            >
              <Grid item>
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
              </Grid>

              <Grid item>
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
              </Grid>
            </Grid>
          </Paper>

          <br />

          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '1000px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '1000px', marginBottom: '10px' }}
            >
              <Grid item>
               <Typography
                variant="subheading"
                style={{ color: 'red' }}
                gutterBottom
                >
                Please add ingredients separated by commas:
                </Typography>
                <TextField
                  name="Ingredient"
                  label="Ingredients"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ingredients}
                  style={{ width: '900px' }}
                />
              </Grid>
            </Grid>
          </Paper>

          <br />

          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '1000px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '700px' }}
            >
              <Grid item>
                <Typography
                variant="subheading"
                style={{ color: 'red' }}
                gutterBottom
                >
                Select Health and Dietary Labels from suggested:
                </Typography>
                <TextField
                  name="healthLabels"
                  label="Health Labels"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ healthLabels }
                  style={{ width: '700px' }}
                />
              </Grid>

              <Grid item>
                <div>
                  {chipData.map(data => {
                    return (
                      <Chip
                        key={data.key}
                        label={data.label}
                        onDelete={ handleChipSelect(data) }
                        className={classes.chip}
                      />
                    );
                  })}
                  </div>
              </Grid>

              <Grid item>
                <TextField
                  name="dietLabels"
                  label="Diet Labels"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ dietLabels }
                  style={{ width: '700px' }}
                />
              </Grid>
            </Grid>
          </Paper>

          <br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: '100px' }}
          >
            Create Recipe
          </Button>

          <br />
        </form>
            </div>
      </Fragment>
    );
  }
}

CreateRecipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

const matchStateToProps = (state) => {
    return {
        userId: state.auth.id
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: recipe => dispatch(addCreatedRecipe(recipe)),
  };
};

export default connect(matchStateToProps, mapDispatchToProps)(withStyles(styles)(CreateRecipe));

