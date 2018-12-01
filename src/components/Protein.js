import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
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


class Protein extends Component {
    constructor() {
        super()
        this.state = {
            beef: false,
            lamb: false,
            chicken: false,
            fish: false,
            pork: false,
            tofu: false
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
        const { beef, lamb, chicken, fish, pork, tofu } = this.state

        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className={classes.divstyle}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h4' className={classes.boldedText}>
                                What protein do you usually eat?
                            </Typography>
                            <br />
                            <Typography variant='subtitle1' fontWeight='bold'>
                                Think of one or two proteins that you are happy eating everyday for the rest of your life
                            </Typography>
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={handleChange}
                                        value="checkedA"
                                        color='primary'
                                        label='beef'
                                    />
                                }
                                label="Beef"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={handleChange}
                                        value="checkedA"
                                        color='primary'
                                        label='lamb'
                                    />
                                }
                                label="Lamb"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={handleChange}
                                        value="checkedA"
                                        color='primary'
                                        label='chicken'
                                    />
                                }
                                label="Chicken"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={handleChange}
                                        value="checkedA"
                                        color='primary'
                                        label='fish'
                                    />
                                }
                                label="Fish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={handleChange}
                                        value="checkedA"
                                        color='primary'
                                        label='pork'
                                    />
                                }
                                label="Pork"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={handleChange}
                                        value="checkedA"
                                        color='primary'
                                        label='tofu'
                                    />
                                }
                                label="Tofu"
                            />
                            <br/>
                            <br/>
                            <Link to = '/survey/diet' className={classes.noUnderline}>
                            <Button variant='contained' color='primary' size='large'>
                                Next
                            </Button>
                            </Link>
                            <br />
                            <br/>
                            <Link to='/survey/cuisine' className={classes.noUnderline}>
                                <Typography variant='subtitle1' className={classes.boldedText}>
                                    Back
                                </Typography>
                            </Link>
                        </form>
                    </div>
                </Grid>
            </Fragment>
        )
    }
}

const mapDispatchToProps = ({})

export default withStyles(styles)(connect(null, mapDispatchToProps)(Protein))
