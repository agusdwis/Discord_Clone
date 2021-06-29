import React from 'react';

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from '@material-ui/icons/Comment';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import ListItem from '@material-ui/core/ListItem';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import GamesIcon from '@material-ui/icons/Games';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';

const style = makeStyles((theme) => ({
    root: {
        margin: 0,
        color: '#fff',
    },
    container: {
        backgroundColor: '#36393F',
        color: '#fff',
        height: '70vh',
        [theme.breakpoints.up('md')]: {
            width: '30vw',
            paddingTop: '15px'
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: '25px'
        },
    },
    action: {
        backgroundColor: '#36393F',
        color: '#fff'
    },
    avatar: {
        backgroundColor: '#ff4843',
    },
    centering: {
        maxHeight: '50px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '40px',
    }
}));

const Choices = [
    {
        text: "Register to gain access!",
        icon: <VpnKeyIcon/>,
        color: '#fff'
    },
    {
        text: "Be sure to play nice!",
        icon: <CommentIcon/>,
        color: '#fff'
    },
    {
        text: "Curious about our ranks?",
        icon: <GamesIcon/>,
        color: '#fff'
    },
    {
        text: "Spend time talking other things.",
        icon: <AlarmOnIcon/>,
        color: '#fff'
    },
];

export default function GuildModal(props) {
    const classes = style();
    const [open, setOpen] = React.useState(props.init);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.postNewMember();
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.root}
            >
                <DialogContent className={classes.container}>
                    <Grid className={classes.container} container spacing={0}>
                        <Grid className={classes.centering} item xs={12}>
                            <Avatar classes={{root:classes.avatar}}
                                    src={require('../assets/images/Chat/default_avatar.png')} />

                            <h3 style={{marginTop: '20px', fontSize: '24px', color:'#B4B6B9'}}>
                                Welcome to
                                <span style={{color: '#fff'}}> {props.guild_info.name}</span>
                            </h3>

                            <p style={{paddingTop: '10px', color:'#B4B6B9', fontSize: '14px'}}>
                                {props.guild_info.description}
                            </p>
                        </Grid>
                        <Grid style={{paddingTop: '10px'}} item xs={12}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                className={classes.root}
                            >
                                {Choices.map((item, index) => (
                                    <ListItem key={index} button>
                                        <ListItemIcon style={{color: item.color}}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text}/>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="comments">
                                                <ArrowForwardIosIcon style={{color: '#fff'}} />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions className={classes.action}>
                    <Button style={{color: '#fff'}} onClick={handleClose} color="secondary">
                        Not Now
                    </Button>
                    <Button style={{color: '#fff'}} onClick={handleSubmit} color="secondary" autoFocus>
                        Join
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
