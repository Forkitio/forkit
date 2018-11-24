import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'
import { withStyles } from '@material-ui/core/styles';


const style = {
    marginTop: '300px',
    textAlign: 'center'
}

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
        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                    <div style={style}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h4' fontWeight='bold'>
                                How skilled are you?
                            </Typography>
                            <br/>
                            <Typography variant='subtitle1' fontWeight='bold'>
                                This will help us match you with recipes that you can actually cook - not just stare at!
                            </Typography>
                            <br/>
                            <br />
                            <Slider
                                // classes={{ container: classes.slider }}
                                value={skill}
                                min={0}
                                max={6}
                                step={1}
                                onChange={this.handleChange}
                            />
                            <br />
                            <Button variant='contained' color='primary' size='large'>
                                Next
                            </Button>
                            <br />
                        </form>
                    </div>
                </Grid>
            </Fragment>
        )
    }
}

export default Skill