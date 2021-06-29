import React from 'react';

import NotificationsIcon from "@material-ui/icons/Notifications";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PeopleIcon from "@material-ui/icons/People";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from '@material-ui/icons/Chat';
import HelpIcon from '@material-ui/icons/Help';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontSize: '16px',
        fontWeight: 'bold',
    },
    search: {
        position: 'relative',
        display: 'flex',
        borderRadius: 6,
        backgroundColor: '#202225',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#68696B'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '10ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    help: {
        display: 'flex',
        color: 'inherit'
    },
    appBar : {
        boxShadow: 'none',
        borderBottom: '1px solid #292929'
    },
    mobileBar: {
        color: '#fff'
    },
    iconButton: {
        color:"#B9BBBE",
    }
}));

export default function TopNavbar (props){
    const classes = useStyles();

    const [setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            classes={{list:classes.mobileBar}}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" className={classes.iconButton}>
                    <Badge badgeContent={0} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 7 new notifications" className={classes.iconButton}>
                    <Badge badgeContent={0} color="secondary">
                        <PeopleIcon />
                    </Badge>
                </IconButton>
                <p>People</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    className={classes.iconButton}
                >
                    <Badge badgeContent={0} color="secondary">
                        <ChatIcon />
                    </Badge>
                </IconButton>
                <p>Chat</p>
            </MenuItem>
        </Menu>
    );

    return(
        <React.Fragment>
            <AppBar classes={{colorPrimary: classes.appBar}} position="sticky" >
                <Toolbar style={{ backgroundColor: '#36393F', minHeight: '20px', maxHeight: '60px' }}>
                    <Grid item lg={2}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {props.guild_info.name}
                    </Typography>
                    </Grid>
                    <Typography className={classes.title} variant="h6" noWrap>
                        # general
                    </Typography>

                    <div className={classes.grow} />
                    
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new notifications" className={classes.iconButton}>
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 4 friend request" className={classes.iconButton}>
                            <Badge badgeContent={0} color="secondary">
                                <PeopleIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="account of current user" className={classes.iconButton}>
                            <Badge badgeContent={0} color="secondary">
                                <ChatIcon />
                            </Badge>
                        </IconButton>
                    </div>

                    <div className={classes.search}>
                        <InputBase
                            placeholder="Search"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                    </div>

                    <div className={classes.help}>
                        <IconButton className={classes.iconButton}>
                            <AlternateEmailIcon/>
                        </IconButton>

                        <IconButton className={classes.iconButton}>
                            <HelpIcon/>
                        </IconButton>
                    </div>

                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            className={classes.iconButton}
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </React.Fragment>
    )
}