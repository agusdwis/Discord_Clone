import React from 'react';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Transition from "react-transition-group/Transition";
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from 'prop-types';
import {
    HomeDiscordIcon,
    MicrophoneIcon,
    HeadphoneIcon,
    SettingIcon} from "../utils/CustomIcon";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const myStyles = makeStyles((theme) => ({
    rootNavBar:{
        width: '100%',
        position: 'fixed',
        backgroundColor: '#292B2F',
        color: '#fff',
        bottom: 0,
        zIndex: 1500,
        fontSize: 'small',
        [theme.breakpoints.up('lg')]: {
            width: '15.8%',
            zIndex: 99
        },
    },
    selectedRoot: {
        color: '#fff',
    },
    actionRoot: {
        color: '#fff',
        minWidth: '40px',
    },

    root: {
        flexGrow: 1,
        backgroundColor: '#36393F',
        color: '#fff',
        display: 'flex',
        height: `calc(100vh-3vmax)`,
        zIndex: 2000,
        border: 'none',
        [theme.breakpoints.down('sm')]: {
            width: '100vw'
        },
        overflowY: 'auto'
    },
    tabs: {
        backgroundColor: '#2F3136',
        width: '30vw',
        alignItems: 'flex-end',
        paddingTop: '30px',
        height: `calc(100vh-30px)`,
        [theme.breakpoints.down('md')]: {
            width: '100vw'
        },
    },
    tabPanel:{
        maxHeight: `calc(100vh-8)`,
        height: `calc(100vh-8)`,
        overflowY: 'auto',
        width: '70vw',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36393F !important',
        color: '#fff',
        [theme.breakpoints.down('sm')]: {
            width: '50vw'
        },
    },
    tabPanel2:{
        maxHeight: `calc(100vh-8)`,
        height: `calc(100vh-80)`,
        overflowY: 'auto',
        width: '70vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36393F !important',
        color: '#fff',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '50vw'
        },
    },
    noUpper: {
        textTransform: 'none',
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: '3px',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    rootPaper:{
        width: '50vw',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        border: '1px solid black',
        color: '#797D82',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    textContainer: {
        paddingTop: theme.spacing(5),
        width: '40vw',
        color: '#A6A8AB',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 400,
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            marginRight: theme.spacing(0),
        },

    },
    textProfile: {
        flexDirection: 'column',
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(0),
        }
    },
    cPanel:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        width: '50vw'
    },
    wrap: {
        width: '100%'
    }
}));

function TabPanel(props) {
    const classes = myStyles();
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box component="div" p={4} className={classes.tabPanel}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const renderPanel = (
        <React.Fragment>
            <video width="320" height="240" loop={100} autoPlay>
                <source src={require('../assets/images/Loading/loading.webm')} type="video/webm"/>
            </video>
            <p style={{fontSize: '16px', fontStyle: 'italic', textTransform: 'uppercase', fontWeight: 500}}>Nothings Here</p>
        </React.Fragment>
);

export default function BottomNavBar(props, postLogout) {
    // post logout
    postLogout = async () => {
        await props.doSignOut();
    };

    // set state
    const classes = myStyles();
    const [value, setValue] = React.useState(0);
    const [setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    // handle func
    const handleClose = () => {setAnchorEl(null)};
    const handleClickOpen = () => {setOpen(true)};
    const handleClickClose = () => {setOpen(false)};
    const handleChange = (event, newValue) => {setValue(newValue)};

    return (
        <React.Fragment>

            {/*Profile Section*/}
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab classes={{wrapper: classes.wrapper}} style={{color: '#ff0012', fontWeight: 'bold'}} label="My Account" {...a11yProps(0)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Privacy and Safety" {...a11yProps(1)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Authorized Apps" {...a11yProps(2)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Connections" {...a11yProps(3)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Billing" {...a11yProps(4)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Discord Nitro" {...a11yProps(5)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Gift Inventory" {...a11yProps(6)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Server Boost" {...a11yProps(7)} />
                            <Tab classes={{root:classes.noUpper, wrapper: classes.wrapper}} label="Notification" {...a11yProps(8)} />
                            <Tab classes={{wrapper: classes.wrapper}} style={{color: '#ff0012', fontWeight: 'bold'}}
                                 onClick={()=>postLogout()} label="Log Out" {...a11yProps(9)} />
                            <Tab classes={{wrapper: classes.wrapper}} style={{color: '#31ff00', fontWeight: 'bold'}}
                                 onClick={handleClickClose} label="Close" {...a11yProps(10)} />
                        </Tabs>
                        <TabPanel value={value} index={0} >
                            <Paper elevation={0} className={classes.tabPanel}>
                                <Typography variant="h6" style={{fontWeight: 'bold'}}>
                                    MY ACCOUNT
                                </Typography>
                                <Paper elevation={0} className={classes.rootPaper}>
                                    {props.info.avatar ?
                                        <Avatar classes={{root: classes.avatar}} alt={props.info.name} src={props.info.avatar}/>
                                        :
                                        <Avatar classes={{root: classes.avatar}} alt={props.info.name}
                                                src={require('../assets/images/Chat/default_avatar.png')}/>
                                    }

                                    <div className={classes.textProfile}>
                                        <div>
                                            <Typography variant={'h6'} style={{fontSize: '13px', fontWeight: 500 }}>
                                                USERNAME
                                            </Typography>
                                            {props.info.username}
                                        </div>
                                        <div style={{ paddingTop: '1vmax' }}>
                                            <Typography variant={'h6'} style={{fontSize: '13px', fontWeight: 500 }}>
                                                EMAIL
                                            </Typography>
                                            {props.info.email}
                                        </div>
                                    </div>
                                </Paper>
                                <div className={classes.textContainer}>
                                    <Typography variant="h6" style={{fontWeight: 'bold', color: '#fff'}}>
                                        TWO-FACTOR AUTHENTICATION
                                    </Typography>
                                    <Typography style={{paddingTop: '1vmax'}}>
                                        Protect your Discord account with an extra layer of security. Once configured you'll be required
                                        to enter both your password and an authentication code from your mobile phone in order to sign in.
                                    </Typography>
                                </div>
                                <Button variant="contained" color="secondary" style={{marginTop: '1vmax', backgroundColor: '#7289DB', textTransform: 'none', padding: '5px'}}>
                                    Enable Two-Factor Auth
                                </Button>
                            </Paper>
                        </TabPanel>
                        {[1,2,3,4,5,6,7,8].map((item, index) => (
                        <TabPanel key={index} value={value} index={item}>
                            <Paper elevation={0} className={classes.tabPanel2}>
                                <div className={classes.cPanel}>
                                    {renderPanel}
                                </div>
                            </Paper>
                        </TabPanel>
                        ))}
                    </div>
                </Dialog>

                {/*Bottom NavBar*/}
                <BottomNavigation
                    onClick={(event, newValue) => {
                        setValue(0);
                    }}
                    showLabels
                    classes={{root:classes.rootNavBar}}
                >

                    <BottomNavigationAction
                        classes={{root: classes.actionRoot, selected: classes.selectedRoot}}
                        label={props.data.infos.username}
                        icon={<HomeDiscordIcon style={{color: '#0bff41'}}/>}/>
                    <BottomNavigationAction
                        classes={{root: classes.actionRoot}}
                        label=""
                        icon={<MicrophoneIcon style={{color: '#fff'}} />} />
                    <BottomNavigationAction
                        classes={{root: classes.actionRoot}}
                        label=""
                        icon={<HeadphoneIcon style={{color: '#fff'}} />} />
                    <BottomNavigationAction
                        onClick={handleClickOpen}
                        classes={{root: classes.actionRoot}}
                        label=""
                        icon={<SettingIcon style={{color: '#fff'}} />} />

                </BottomNavigation>
            </React.Fragment>
        );
}
