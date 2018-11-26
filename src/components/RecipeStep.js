import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addRecipe } from './../store/recipes';

class RecipeStep extends Component {
  constructor() {
    super();
    this.state = {
        steps: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const steps = Object.assign({}, this.state.steps, {
        [event.target.name]: event.target.value,
      });
      this.setState({ steps });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { success, error } = this.state;
    const {
        title,
        directions,
        ingredients,
        time,
        serving,
        nutrition,
        healthLabels,
        dietLabels,
        image
    } = this.state.recipe;

    return (
        <Fragment>
          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '900px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '700px' }}
            >
              <Grid item>
                <TextField
                  required
                  name="directions"
                  label="Step 1"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ directions }
                  style={{ width: '700px' }}
                />
                <Button variant = 'outlined' color = 'primary' size = 'small'>
                    + Add a Recipe
                </Button>
              </Grid>

            </Grid>
          </Paper>

          <br />
          <br />
          </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: recipe => dispatch(addRecipe(recipe)),
  };
};

export default connect(null, mapDispatchToProps)(RecipeStep);

