import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { updateUser } from '../store/userStore'
import Skill from './Skill'


const styles = theme => ({
    divstyle: {
        marginTop: '300px',
        textAlign: 'center'
    },

    fieldstyle: {
        marginLeft: '20px'
    },

    noUnderline: {
        textDecoration: 'none'
    },

    boldedText: {
        fontWeight: 'bold'
    }
})


class Diet extends Component {
    constructor() {
        super()
        this.state = {
            diet : '',
            completed : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        console.log(ev.target)
        console.log( ev.target.value )
        this.setState({
            diet : ev.target.value
        })
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const updatedUser = {...this.props.user, diet : this.state.diet }
        this.props.updateUser(updatedUser)
            .then(() => this.setState({ completed : true }))
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { classes } = this.props
        return (
            <Fragment>
            {
            !this.state.completed ? (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className={classes.divstyle}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h4' className={classes.boldedText}>
                                Are you on any diets?
                            </Typography>
                            <br />
                            <Typography variant='subtitle1' fontWeight='bold'>
                                Select the diet that you are on
                            </Typography>
                            <br />
                            <FormControl>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                value={this.state.value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="vegan" control={<Radio />} label="Vegan" />

                                <FormControlLabel value="vegetarian" control={<Radio />} label="Vegetarian" />

                                <FormControlLabel value="paleo" control={<Radio />} label="Paleo" />

                                <FormControlLabel value="low-carb" control={<Radio />} label="Low-Carb Diet" />

                                <FormControlLabel value="no diet" control={<Radio />} label="Not on a diet" />

                            </RadioGroup>
                            </FormControl>
                            <br/>
                            <br/>
                            <Button variant='contained' color='primary' size='large' type='submit'>
                                Next
                            </Button>
                            <br />
                            <br/>
                            <Link to='/survey/protein' className={classes.noUnderline}>
                                <Typography variant='subtitle1' className={classes.boldedText}>
                                    Back
                                </Typography>
                            </Link>
                        </form>
                    </div>
                </Grid>
            </Fragment> ) : <Skill />
        }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user : state.user.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateUser : user => dispatch(updateUser(user))
    }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Diet))
