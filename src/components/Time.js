import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { updateUser } from '../store/userStore'
import Signup from './Signup'


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

class Time extends Component {
    constructor() {
        super()
        this.state = {
            time : '',
            completed : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
            time : ev.target.value
        })
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const updatedUser = {...this.props.user, time : this.state.time }
        this.props.updateUser(updatedUser)
            .then(() => this.setState({ completed : true }))
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { classes } = this.props

        return (
            <Fragment>
            { !this.state.completed ? (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className={classes.divstyle}>
                        <form onSubmit={handleSubmit}>
                        <Typography variant='h4' className={classes.boldedText}>
                            On average, how long do you usually spend cooking?
                            </Typography>
                            <FormControl>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                value={this.state.value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="15 min " control={<Radio />} label="Real quick! About 15 minutes." />
                                <FormControlLabel value="30 min" control={<Radio />} label="No more than 30 minutes." />
                                <FormControlLabel value="1 hr" control={<Radio />} label="I've got some time, but not over an hour." />
                                <FormControlLabel value="> 1 hr" control={<Radio />} label="Throwing down in the kitchen! An hour plus." />
                            </RadioGroup>
                            </FormControl>
                            <br />
                            <br />
                            <Button variant='contained' color='primary' size='large' style={{ textDecoration: 'none' }} type='submit'>
                                Next
                            </Button>
                        </form>
                        <br />
                        <br />
                            <Link to='/survey/diet' className={classes.noUnderline}>
                                <Typography variant='subtitle1' className={classes.boldedText}>
                                    Back
                                </Typography>
                            </Link>
                    </div>
                </Grid>
            </Fragment> ) : <Signup />
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Time))
