import React from 'react';

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Avatar from '@material-ui/core/Avatar';
import List from "@material-ui/core/List";
import * as moment from 'moment-timezone';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100ch',
        backgroundColor: '#36393F',
        padding: theme.spacing(0),
        border: 'none',
        '&:hover': {
            backgroundColor: '#32353B',
            borderRadius: theme.spacing(3),
            cursor: 'pointer',
        }
    },
    inline: {
        display: 'inline',
    },
    myRoot: {
        paddingBottom: '2px',
        paddingTop: '2px'
    },
    message: {
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.375rem',
        display: 'inline',
        verticalAlign: 'baseline',
        position: 'relative',
    },
    username: {
        fontSize: '1rem',
        fontWeight: '600',
        lineHeight: '1.375rem',
        marginRight: '0.25rem',
        cursor: 'pointer'
    },
    datetime: {
        fontSize: '0.75rem',
        fontWeight: '500',
        lineHeight: '1.375rem',
        marginLeft: '0.25rem',
        color: '#72767d',
        verticalAlign: 'baseline',
    },
    avatar: {
        backgroundColor: '#ff4843',
    },
}));

export default function ChatList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem classes={{root: classes.myRoot}} alignItems="flex-start">
                <ListItemAvatar style={{cursor: 'pointer'}}>
                    {props.avatar ?
                        <Avatar classes={{root:classes.avatar}} alt={props.username} src={props.avatar} />
                        :
                        <Avatar classes={{root:classes.avatar}} alt={props.username}
                                src={require('../assets/images/Chat/default_avatar.png')} />
                    }
                </ListItemAvatar>
                <ListItemText
                    className={classes.message}
                    primary={
                        <React.Fragment>
                            <div style={{display: 'flex'}}>
                                <Typography classes={{root:classes.username}}>
                                    {props.username}
                                </Typography>
                                <Typography className={classes.datetime}>
                                    {moment.utc(props.dtime).format('LLL')}
                                </Typography>
                            </div>

                        </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                          <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textSecondary"
                              style={{color: '#dcddde'}}
                          >
                              {props.message}
                          </Typography>
                      </React.Fragment>
                      }
                />
            </ListItem>
        </List>
    );
}
