import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';


const divstyle = {
    marginTop: '300px',
    textAlign: 'center'
}

const fieldstyle = {
    marginLeft: '20px'
}


class Name extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
            [ ev.target.name ] : ev.target.value
        })
    }

    handleSubmit(ev) {
        ev.preventDefault()
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { firstName, lastName } = this.state
        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                    <div style={divstyle}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h4' fontWeight='bold'>
                                Hola, What's your name?
                            </Typography>
                            <br/>
                            <TextField
                                label="First Name"
                                value={firstName}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={handleChange}
                                style = {fieldstyle}
                            />
                            <br />
                            <br/>
                            <Link to = '/survey/protein'><Button variant='contained' color='primary' size='large'>
                                Next
                            </Button>
                            </Link>
                        </form>
                    </div>
                </Grid>
            </Fragment>
        )
    }
}

export default Name