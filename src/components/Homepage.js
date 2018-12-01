import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Nav from './Nav'


const Homepage = ({ classes, history })=> {
    return (
        <Fragment>
            <Nav history={history}/>
            <div className = {classes.navBarSpace}>
                <div className = {classes.centerText}>
                    <Typography variant='h4' fontWeight='bold' className = {classes.whiteTextTitle}>
                        Take the survey and find out your recipes.
                    </Typography>
                    <br />
                    <Typography variant='subtitle1' fontWeight='bold' className = {classes.whiteText}>
                        A place to share and save your favorite meals and discover more food memories.
                    </Typography>
                    <br />

                    <Link to='/survey/name' className={classes.noUnderline}>
                        <Button className={classes.getStartedButtton}>
                            Get Started
                        </Button>
                    </Link>
                </div>
                <img src='/public/background.jpg' className={classes.centerImage}/>
            </div>
        </Fragment>
    )
}

const styles = theme => ({
    navBarSpace: {
        marginTop: '30px',
        textAlign: 'left',
        position: 'relative',
    },
    centerText: {
        position: 'absolute',
        top: '40%',
        right: '10%',
    },
    getStartedButtton: {
        borderColor: 'white',
        backgroundColor: 'FF3B4A',
        color: 'white',
    },
    centerImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center'
    },
    whiteTextTitle: {
        color: 'white',
        fontWeight: 'bold'
    },
    whiteText: {
        color: 'white',
    },
    noUnderline: {
        textDecoration: 'none'
    },
});

export default withStyles(styles)(Homepage)
