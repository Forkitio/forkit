import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Grid, Typography, Button, Divider, TextField, ButtonBase, Checkbox } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles'
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


class Cuisine extends Component {
    constructor() {
        super()
        this.state = {
            chinese: false,
            italian: false,
            indian: false,
            thai: false,
            mediterranean: false,
            japanese: false,
            completed : false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        //console.log('ev target name: ', ev.target.name)
        //console.log('ev target check: ', ev.target.checked)
        this.setState({
            [ev.target.name]: ev.target.checked
        });
    }

    handleSubmit(ev) {
        ev.preventDefault()
        const copyState = {...this.state};
        const cuisines = [];
        for( let cuisine in copyState) {
            if( copyState[cuisine] === true ) {
                cuisines.push(cuisine)
            }
        }
        const updatedUser = {...this.props.user, cuisine : cuisines}
        //console.log('updated User: ', updatedUser )
        this.props.updateUser(updatedUser)
            .then(() => this.setState({ completed : true }))
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { classes, user } = this.props
        const { chinese, indian, italian, thai, mediterranean, japanese, completed } = this.state
        if(!user.id) {
            return <Redirect to='/survey/name' />
        }
         return (
             <Fragment>
                <Grid container justify="center" display="flex">
                <img src='/public/forkit-bk.png'></img>
                </Grid>
             {
                 !completed ? (
                 <Fragment>
                    <Grid container justify="center" display="flex">
                    <div className = {classes.divstyle}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant='h4' className = {classes.boldedText}>
                               What are your favorite cuisines?
                            </Typography>
                            <br />
                            <Typography variant='subtitle1' fontWeight='bold'>
                                Select the cuisines that you like
                            </Typography>
                            <br />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={chinese}
                                        onChange={handleChange}
                                        value='chinese'
                                        name='chinese'
                                        color='primary'
                                        label='chinese'
                                    />
                                }
                                label="Chinese"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={italian}
                                        onChange={handleChange}
                                        value="italian"
                                        name='italian'
                                        color='primary'
                                        label='italian'
                                    />
                                }
                                label="Italian"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={indian}
                                        onChange={handleChange}
                                        value="indian"
                                        name='indian'
                                        color='primary'
                                        label='indian'
                                    />
                                }
                                label="Indian"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={thai}
                                        onChange={handleChange}
                                        value="thai"
                                        name='thai'
                                        color='primary'
                                        label='thai'
                                    />
                                }
                                label="Thai"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={mediterranean}
                                        onChange={handleChange}
                                        value="mediterranean"
                                        name='mediterranean'
                                        color='primary'
                                        label='mediterranean'
                                    />
                                }
                                label="Mediterranean"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={japanese}
                                        onChange={handleChange}
                                        value="japanese"
                                        name='japanese'
                                        color='primary'
                                        label='japanese'
                                    />
                                }
                                label="Japanese"
                            />
                            <br/>
                            <br/>
                            <Button variant='contained' color='primary' size='large' type='submit'>
                                Continue
                            </Button>
                            <br/>
                            <br/>
                            <div>
                            <Link to='/survey/name' className={classes.noUnderline}>
                                <Typography variant='subtitle1' className={classes.boldedText}>
                                    Back
                                </Typography>
                            </Link>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Fragment>) : <Redirect to='/survey/protein' />
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Cuisine))
