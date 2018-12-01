import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'


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
            skill: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    handleSubmit(ev) {
        ev.preventDefault()
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { skill } = this.state
        const { classes } = this.props
        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className={classes.divstyle}>
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
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Gordon Ramsey, just less angry" />
                                <FormControlLabel value="female" control={<Radio />} label="I know what paprika is" />
                                <FormControlLabel value="male" control={<Radio />} label="I can make an omelette" />
                                <FormControlLabel value="other" control={<Radio />} label="I am useless in the kitchen" />
                            </RadioGroup>
                        </FormControl>
                        <div>
                            <Link to='/survey/protein' className={classes.noUnderline}>
                                <Button variant='contained' color='primary' size='large'>
                                    Continue
                            </Button>
                            </Link>
                        </div>
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
            </Fragment>
        )
    }
}

const mapDispatchToProps = ({})

export default withStyles(styles)(connect(null, mapDispatchToProps)(Skill))