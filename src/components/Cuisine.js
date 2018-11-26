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


class Cuisine extends Component {
    constructor() {
        super()
        this.state = {
            chinese: false,
            italian: false,
            indian: false,
            thai: false,
            mediterranean: false,
            japanese: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.checked,
        });
        console.log(this.state)
    }

    handleSubmit(ev) {
        ev.preventDefault()
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { classes } = this.props
        const { chinese, indian, italian, thai, mediterranean, japanese } = this.state
         return (
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
                                        value="chinese"
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
                                        color='primary'
                                        label='japanese'
                                    />
                                }
                                label="Japanese"
                            />
                            <br/>
                            <br/>
                            <Link to = '/survey/skill' className={classes.noUnderline}>
                            <Button variant='contained' color='primary' size='large'>
                                Continue
                            </Button>
                            </Link>
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
            </Fragment>
        )
    }
}

const mapDispatchToProps = ({})

export default withStyles(styles)(connect(null, mapDispatchToProps)(Cuisine))