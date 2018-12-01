import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { updateUser } from '../store/userStore'
import Diet from './Diet'


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
            beef : false,
            lamb : false,
            chicken : false,
            fish : false,
            vegetarian : false,
            tofu : false,
            completed : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.checked
          });
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const copyState = {...this.state}
        const proteins = [];
        for(let protein in copyState) {
            copyState[protein] === true ? proteins.push(protein) : null
        }
        const updatedUser = {...this.props.user, protein : proteins}
        this.props.updateUser(updatedUser)
            .then(() => this.setState({ completed : true }))
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { classes } = this.props
        const { beef, lamb, chicken, fish, vegetarian, tofu, completed } = this.state
        return (
            <Fragment>
            { !completed ? (
            <Fragment>
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
                                        checked={beef}
                                        onChange={handleChange}
                                        value='beef'
                                        name='beef'
                                        color='primary'
                                        label='beef'
                                    />
                                }
                                label="Beef"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={lamb}
                                        onChange={handleChange}
                                        value="lamb"
                                        name='lamb'
                                        color='primary'
                                        label='lamb'
                                    />
                                }
                                label="Lamb"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={chicken}
                                        onChange={handleChange}
                                        value="chicken"
                                        name='chicken'
                                        color='primary'
                                        label='chicken'
                                    />
                                }
                                label="Chicken"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={fish}
                                        onChange={handleChange}
                                        value="fish"
                                        name='fish'
                                        color='primary'
                                        label='fish'
                                    />
                                }
                                label="Fish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={vegetarian}
                                        onChange={handleChange}
                                        value="vegetarian"
                                        color='primary'
                                        label='vegetarian'
                                    />
                                }
                                label="Vegetarian"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={tofu}
                                        onChange={handleChange}
                                        value="tofu"
                                        name='tofu'
                                        color='primary'
                                        label='tofu'
                                    />
                                }
                                label="Tofu"
                            />
                            <br/>
                            <br/>
                            <Button variant='contained' color='primary' size='large' type='submit'>
                                Next
                            </Button>
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
            </Fragment> ) : <Diet/>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Protein))
