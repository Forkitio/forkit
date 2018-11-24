import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';


const style = {
    marginTop: '300px',
    textAlign: 'center'
}

class Protein extends Component {
    constructor() {
        super()
        this.state = {
            beef: false,
            lamb: false,
            chicken: false,
            fish: false,
            pork: false,
            vegeterian: false
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
        const { proteins } = this.state
        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                    <div style={style}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h4' fontWeight='bold'>
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
                                        label='Beef'
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
                                        label='Beef'
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
                                        label='Beef'
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
                                        label='Beef'
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
                                        label='Beef'
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
                                        label='Beef'
                                    />
                                }
                                label="Vegeterian"
                            />
                            <br/>
                            <br/>
                            <Link to = '/survey/skill'><Button variant='contained' color='primary' size='large'>
                                Next
                            </Button>
                            </Link>
                            <br />
                        </form>
                    </div>
                </Grid>
            </Fragment>
        )
    }
}

export default Protein