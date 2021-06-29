import React from 'react';

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import Avatar from '@material-ui/core/Avatar';
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: '36ch',
        backgroundColor: '#2F3136',
        padding: theme.spacing(0),
        border: 'none'
    },
    inline: {
        display: 'inline',
    },
    myRoot: {
        paddingBottom: '4px',
        paddingTop: '4px'
    },
    avatar: {
        backgroundColor: '#184dff',
    },
}));

export default function MemberList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem classes={{root: classes.myRoot}} button alignItems="flex-start">
                <ListItemAvatar>
                    {props.avatar ?
                        <Avatar classes={{root: classes.avatar}} alt={props.fullName} src={props.avatar}/>
                        :
                        <Avatar classes={{root: classes.avatar}} alt={props.fullName}
                                src={require('../assets/images/Chat/default_avatar.png')}/>
                    }
                </ListItemAvatar>
                <ListItemText style={{color: '#fff'}}
                    primary={props.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textSecondary"
                                style={{color: '#6a6fff'}}
                            >
                                {/*status/bio*/}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}
