import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import deepPurple from "@material-ui/core/colors/deepPurple";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from "@material-ui/core/Divider";
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import PropTypes from 'prop-types';

import {
    AddServerIcon,
    DownloadIcon,
    ExploreIcon,
    HomeDiscordIcon} from "../utils/CustomIcon";

import '../assets/styles/style.css';

// MainBar Width
const drawerWidth = 72;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        backgroundColor: '#202225 !important',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: 'transparent !important',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        zIndex: 99999
    },
    toolbar: {
        backgroundColor: 'none'
    },
    drawerPaper: {
        width: drawerWidth,
        paddingTop: '8px',
        backgroundColor: '#202225',
        '::-webkit-scrollbar': {
            display: 'none !important',
        }
    },
    listRoot: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: theme.spacing(6),
        minWidth: theme.spacing(6),
        width: theme.spacing(1),
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    listGutter:{
        borderRadius: 40,
        backgroundColor: '#36393F',
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '4px',
        '&:hover': {
            borderRadius: 10,
            backgroundColor: '#7289DB',
        },
    },
    iconRoot: {
        display: 'flex',
        minWidth: theme.spacing(3),
        minHeight: theme.spacing(3),
        color: '#4FB581',
        textDecoration: 'none',
        '&:hover': {
            color: '#fff'
        }
    },
    toolBar: {
        boxShadow: 'none'
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    divider: {
        backgroundColor: '#2D2F32',
        paddingBottom: '1px',
        marginBottom: '5px',
        borderRadius: 10

    }
}));

const Menu = [
    {
        label: "Add Server",
        pathname: "#",
        icon: <AddServerIcon/>
    },
    {
        label: "Explore",
        pathname: "/guilds-discovery",
        icon: <ExploreIcon/>
    },
    {
        label: "Download",
        pathname: "#",
        icon: <DownloadIcon/>
    },
];

function MainNavbar(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Home section
    const home = (
        <div>
            <List style={{padding: '0px'}}>
                <Link to={'/'}>
                    <ListItem classes={{root: classes.listRoot, gutters: classes.listGutter}}>
                        <ListItemIcon classes={{root: classes.iconRoot}}><HomeDiscordIcon style={{color: '#fff'}}/></ListItemIcon>
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    // Fixed Menu
    const drawer = (
        <div>
            <List style={{padding: '0px'}}>

                {Menu.map((item, index) => (
                    <Link to={item.pathname} key={index}>
                        <ListItem classes={{root: classes.listRoot, gutters: classes.listGutter}}>
                            <ListItemIcon classes={{root: classes.iconRoot}}>{item.icon}</ListItemIcon>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    // Dynamic Menu
    const channels = (
        <div>
            <List style={{padding: '0px'}}>
                {props.my_guild.map((item, index) => (
                    <Link to="#" onClick={() => props.changeRouter(item.guild_id.id)} key={index}>
                        <ListItem classes={{root: classes.listRoot, gutters: classes.listGutter}}>
                            <Avatar className={classes.purple}>{item.guild_id.name.slice(0,1)}</Avatar>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <AppBar position="fixed" classes={{root:classes.appBar, colorPrimary:classes.toolBar}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <HomeDiscordIcon className={'breadcrumb'}/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >

                        {home}
                        <Divider variant="middle" classes={{root:classes.divider}} />
                        {channels}
                        {drawer}
                    </Drawer>

                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {home}
                        <Divider variant="middle" classes={{root:classes.divider}} />
                        {channels}
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

MainNavbar.propTypes = {
    window: PropTypes.func,
};

export default MainNavbar;