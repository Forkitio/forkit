import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Grid, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { updateUser } from '../store/userStore'
import Time from './Time'


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

class Skill extends Component {
    constructor() {
        super()
        this.state = {
            skill: '',
            completed : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
            skill : ev.target.value
        })
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const updatedUser = {...this.props.user, skill : this.state.skill}
        this.props.updateUser(updatedUser)
        .then(() => this.setState({ completed : true }))
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { completed } = this.state
        const { classes } = this.props
        return (
            <Fragment>
            {
            !completed ? (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className={classes.divstyle}>
                        <form onSubmit={handleSubmit}>
                        <Typography variant='h4' className={classes.boldedText}>
                            What's your skill level in the kitchen?
                            </Typography>
                            <br />
                        <Typography variant='subtitle1'>
                            This will help us source recipes that are just appropriate for you
                            </Typography>
                            <br />
                        <FormControl>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={this.state.value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="advance" control={<Radio />} label="Gordon Ramsey, just less angry" />
                                <FormControlLabel value="beginner" control={<Radio />} label="I know what paprika is" />
                                <FormControlLabel value="intermediate" control={<Radio />} label="I can make an omelette" />
                                <FormControlLabel value="beginner" control={<Radio />} label="I am useless in the kitchen" />
                            </RadioGroup>
                        </FormControl>
                        <div>
                            <Button variant='contained' color='primary' size='large' type='submit'>
                                Continue
                            </Button>
                        </div>
                        </form>
                        <br />
                        <br />
                        <div>
                            <Link to='/survey/cuisine' className={classes.noUnderline}>
                                <Typography variant='subtitle1' className={classes.boldedText}>
                                    Back
                                </Typography>
                            </Link>
                        </div>
                    </div>
                </Grid>
            </Fragment> ) : <Time />
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Skill))

/*

*/
