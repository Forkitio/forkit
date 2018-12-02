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
    onAddRecipe(recipe)
    .then(() => {
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
                  name="Ingredient"
                  label="Ingredients"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ingredients}
                  style={{ width: '800px' }}
                />

                <TextField
                  name="healthLabels"
                  label="Health Labels"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={healthLabels}
                  style={{ width: '800px' }}
                />

                <div>
                  {chipData.map(data => {
                    return (
                      <Chip
                        key={data.key}
                        label={data.label}
                        onDelete={handleChipSelect(data)}
                        className={classes.chip}
                      />
                    );
                  })}
                </div>
                <TextField
                  name="dietLabels"
                  label="Diet Labels"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={dietLabels}
                  style={{ width: '800px' }}
                />
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

