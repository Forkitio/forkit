import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
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

class Time extends Component {
    constructor() {
        super()
        this.state = {
            time: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
    }

    handleSubmit(ev) {
        ev.preventDefault()
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { classes } = this.props

        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className={classes.divstyle}>
                        <Typography variant='h4' className={classes.boldedText}>
                            On average, how long do you usually spend cooking?
                            </Typography>
                            <FormControl>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Vegan" />
                                <FormControlLabel value="female" control={<Radio />} label="Vegeterian" />
                                <FormControlLabel value="male" control={<Radio />} label="Paleo" />
                                <FormControlLabel value="other" control={<Radio />} label="Low-Carb Diet" />
                                <FormControlLabel value="other" control={<Radio />} label="Not on a diet" />
                            </RadioGroup>
                            </FormControl>
                            <div>
                        <Link to='/signup' className={classes.noUnderline}>
                            <Button variant='contained' color='primary' size='large' style={{ textDecoration: 'none' }}>
                                Next
                            </Button>
                        </Link>
                            </div>
                        <br />
                        <br/>
                            <Link to='/survey/diet' className={classes.noUnderline}>
                                <Typography variant='subtitle1' className={classes.boldedText}>
                                    Back
                                </Typography>
                            </Link>
                    </div>
                </Grid>
            </Fragment>
        )
    }
}

const mapDispatchToProps = ({})

export default withStyles(styles)(connect(null, mapDispatchToProps)(Time))