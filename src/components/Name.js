import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'


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
            lastName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
          [ev.target.name]: ev.target.value,
        });
        console.log(this.state)
      };

    handleSubmit(ev) {
        ev.preventDefault()
        console.log(this.state)
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { firstName, lastName } = this.state
        const { classes } = this.props
        return (
            <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
                <Grid container justify="center" display="flex">
                    <div className = {classes.divstyle}>
                    <Typography variant='h4' className = {classes.boldedText}>
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
                            <Link to = '/survey/cuisine' className={classes.noUnderline}>
                            <Button variant='contained' color='primary' size='large' type='submit'>
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

const mapDispatchToProps = ({  })



export default withStyles(styles)(connect(null, mapDispatchToProps)(Name))

