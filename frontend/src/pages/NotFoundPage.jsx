import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        // color: '#fff',
        backgroundColor: '#F6F6F7',
    },
    glitchWrapper:{
        padding: '20px 0',
        order: '2',
    },
    glitch: {
        fontFamily: 'ArchivoBlack,Whitney,Helvetica Neue,Helvetica,Arial,sans-serif',
        fontWeight: 900,
        color: 'rgba(53,54,59,0.69)',
        fontSize: '150px',
        position: 'relative',
        display: 'inline-block',
        fontStyle: 'italic',
        '&:before': {
            left: '2px',
            textShadow: '-2px 0 #e3e7f8',
            clip: 'rect(24px,550px,90px,0)',
            animation: 'glitch-anim-Top 4s linear infinite alternate-reverse',
            content: 'attr(data-text)',
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(246,246,247,0.25)',
        },
        '&:after':{
            left: '-2px',
            textShadow: '-2px 0 rgba(114,137,218,.3)',
            clip: 'rect(85px,550px,140px,0)',
            animation: 'glitch-anim-Bot 2s linear infinite alternate-reverse',
            content: 'attr(data-text)',
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(246,246,247,0.25)',
        }
    },
    textSection: {
        textAlign: 'center',
    },
    logoBottom: {
        position: 'fixed',
        left: 0,
        bottom: '15px',
        textAlign: 'center',
        width: '100%',
    }
}));

const NotFound = () => {
    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.root}>
                <div className={classes.textSection}>
                    <div className={classes.glitchWrapper}>
                        <Link to="/">
                            <div className={classes.glitch}>
                                404
                            </div>
                        </Link>
                    </div>
                    <Link to="/">
                        <h6 style={{fontSize: '20px', lineHeight: '40px', textTransform: 'uppercase', color: '#72767d'}}>Page Not Found</h6>
                    </Link>
                    <div className={classes.logoBottom}>
                        <Link to="/">
                        <img alt="Home" src={require("../assets/images/LogoBottom.svg")} style={{width: '200px'}}/>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default NotFound;