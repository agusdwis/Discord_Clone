import React from 'react';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import {HashTagIcon} from '../utils/CustomIcon';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        color: '#fff',
        backgroundColor: '#2F3136',
        border: 'none',
    },
    nested: {
        paddingLeft: theme.spacing(4),
        '&:hover': {
            backgroundColor: '#393D43',
            borderRadius: theme.spacing(5)
        }
    },
    listRoot: {
        minWidth: '20px',

    }
}));

const myTag = [
    {
        name: 'general'
    },
    {
        name: 'faq',
    },
    {
        name: 'help',
    },
    {
        name: 'announcements',
    },
    {
        name: 'about',
    },

];

export default function ChannelNavbar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >

            <ListItem button onClick={handleClick}>
                <ListItemText primary="Welcome" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding>
                    {myTag.map((item, index) => (
                        <ListItem key={index} button className={classes.nested}>
                            <ListItemIcon className={classes.listRoot}>
                                <HashTagIcon style={{color: '#fff', fontSize: '12px'}} />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}