import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addRecipe } from './../store/recipes';

class CreateRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {
        title: '',
        directions: [],
        ingredients: [],
        time: 0,
        serving: 0,
        nutrition: [],
        healthLabels: [],
        dietLabels: [],
        image: ''
      },
      success: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const recipe = Object.assign({}, this.state.recipe, {
      [event.target.name]: event.target.value,
    });
    this.setState({ recipe });
  }

  handleSubmit(event) {
    const { onAddRecipe } = this.props;
    const { recipe } = this.state;

    event.preventDefault();
    onAddRecipe(recipe).then(() => {
      this.setState({ success: 'Product added successfully!' });
      this.setState({
        recipe: {
            title: '',
            directions: [],
            ingredients: [],
            time: 0,
            serving: 0,
            nutrition: [],
            healthLabels: [],
            dietLabels: [],
            image: ''
        },
        error: ''
        });
    })
    .catch(ex => this.setState({ error: `An error has occurred. ${ex}`, success: '' }));
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
        <Typography variant="h2" gutterBottom style={{ color: '#FF3B4A' }}>
          Create Recipe
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ color: 'green', marginLeft: '25px' }}
          gutterBottom
        >
          {success}
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ color: 'red', marginLeft: '25px' }}
          gutterBottom
        >
          {error}
        </Typography>

        <br />
        <br />

        <form onSubmit={handleSubmit}>
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
              style={{ marginLeft: '20px', width: '900px' }}
            >
              <Grid item>
                <TextField
                  required
                  type="url"
                  name="image"
                  label="image"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={image}
                  style={{ width: '700px' }}
                />
              </Grid>

              {/* <img
                src={image ? image : null}
                style={{
                    width: "25%",
                    height: "25%",
                    marginLeft: "10px",
                    border: image ? "2px solid red" : 'none'
                }}
              /> */}

            <Grid item>
              <TextField
                required
                name="title"
                label="title"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ title }
                style={{ width: "700px" }}
              />
            </Grid>
            </Grid>
          </Paper>

          <br />
          <br />

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
                  label="Step"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ directions }
                  style={{ width: '700px' }}
                />
                <Button variant = 'outlined' color = 'primary' size = 'small'>
                    + Add a Step
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <br />
          <br />

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
                  type="number"
                  step="1"
                  name="serving"
                  placeholder="0"
                  min="1"
                  label="serving"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={serving}
                  style={{ width: '200px' }}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  name="time"
                  type="number"
                  step="1"
                  placeholder="0 minutes"
                  min="0"
                  label="time"
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
          <br />


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
              style={{ marginLeft: '20px', width: '700px', marginBottom: '10px' }}
            >
              <Grid item>
                <TextField
                  required
                  name="Ingredient"
                  label="Ingredient"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={ingredients}
                  style={{ width: '400px' }}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  name="quantity"
                  type="number"
                  step="0.5"
                  placeholder="0 grams"
                  min="0"
                  label="quantity"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  // value={quantity}
                  style={{ width: '200px' }}
                />
              </Grid>
              <Button variant = 'outlined' color = 'primary' size = 'small'>
                + Add an Ingredient
              </Button>
            </Grid>
          </Paper>

          <br />
          <br />


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
                <TextField
                  required
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
          <br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: '100px' }}
          >
            Submit
          </Button>

          <br />
          <br />
        </form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddRecipe: recipe => dispatch(addRecipe(recipe)),
  };
};

export default connect(null, mapDispatchToProps)(CreateRecipe);

