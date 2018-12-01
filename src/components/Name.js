import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { createUser } from '../store/userStore.js'

const styles = theme => ({
    divstyle : {
        marginTop: '300px',
        textAlign: 'center'
    },

    fieldstyle : {
        marginLeft: '20px'
    },

    noUnderline : {
        textDecoration: 'none'
    },

    boldedText : {
        fontWeight : 'bold'
    }
})




class Name extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            userCreated : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
          [ev.target.name]: ev.target.value,
        });
        console.log(this.state)
      }

    handleSubmit(ev) {
        ev.preventDefault();
        const newUser = {...this.state, password : 'placeholder'};
        console.log('inhandleSubmit')
        this.props.createUser(newUser)
            .then(() => this.setState({ userCreated : true }))
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { firstName, lastName, userCreated } = this.state
        const { classes } = this.props

        return (
            <div>
                {!userCreated ? (
                    <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                        <Grid container justify="center" display="flex">
                         <div className={classes.divstyle}>
                        <Typography variant='h4' className={classes.boldedText}>
                            Hola, what's your name?
                            </Typography>
                            <br/>
                            <br/>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name = 'firstName'
                                label="First Name"
                                value={firstName}
                                onChange={handleChange}
                                variant='outlined'
                            />
                            <TextField
                                name = 'lastName'
                                label="Last Name"
                                value={lastName}
                                onChange={handleChange}
                                className = {classes.fieldstyle}
                                variant='outlined'
                            />
                            <br/>
                            <br/>
                            <br/>
                            <Button variant='contained' color='primary' size='large' type='submit'>
                                Next
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Fragment> ) : ( <Redirect to='/survey/cuisine'/> )}
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        createUser : user => dispatch(createUser(user))
    }
};



export default withStyles(styles)(connect(null, mapDispatchToProps)(Name))

