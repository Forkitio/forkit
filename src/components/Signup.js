import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
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


class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
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
        const { username, password } = this.state
        const { classes } = this.props

        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className={classes.divstyle}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h4' className={classes.boldedText}>
                                Sign up
                            </Typography>
                            <br/>
                            <TextField
                                label="Username"
                                value={username}
                                onChange={handleChange}
                                variant='outlined'
                                name='username'
                            />
                            <TextField
                                label="Password"
                                value={password}
                                onChange={handleChange}
                                className={classes.fieldstyle}
                                variant='outlined'
                                name='password'
                            />
                            <br />
                            <br/>
                            <Button variant='contained' color='primary' size='large'>
                                Signup
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Fragment>
        )
    }
}

const mapDispatchToProps = ({})

export default withStyles(styles)(connect(null,mapDispatchToProps)(Signup))