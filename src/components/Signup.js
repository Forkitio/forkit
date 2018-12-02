import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { updateUser } from '../store/userStore'

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
            email: '',
            password: '',
            completed : false
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
        const updatedUser = {
            ...this.props.user,
            email : this.state.email,
            password : this.state.password
        }
        this.props.updateUser(updatedUser)
            .then(() => this.setState({ completed : true }))
    }

    render() {
        const { handleSubmit, handleChange } = this;
        const { email, password, completed } = this.state;
        const { classes, user } = this.props;

        if(!user.id) {
            return <Redirect to='/survey/name' />
        }

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
                                Sign up
                            </Typography>
                            <br/>
                            <TextField
                                label="email"
                                value={email}
                                onChange={handleChange}
                                variant='outlined'
                                name='email'
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
                            <Button variant='contained' color='primary' size='large' type='submit'>
                                Signup
                            </Button>
                        </form>
                    </div>
                </Grid>
                </Fragment> ) : <Redirect to='/login'/>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Signup))
