import React from "react";

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import {fade} from "@material-ui/core";

import {SearchIcon} from "../utils/CustomIcon";
import MediaCard from "./CardComponent";
import ScrollTop from "../utils/ScrollTop";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
        color: '#fff'
    },
    text: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        fontWeight: 'bold',
        position: 'relative',
    },
    searchHeader: {
        position: 'relative',
        textAlign: 'center',
        marginBottom: '32px',
        minHeight: '100px',
    },
    media: {
        height: '23vmax',
        width: '100%',
        borderRadius: 10,
        display: 'inherit'
    },
    headerContentWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '16px',
    },
    searchBox: {
        width: '100%',
        maxWidth: '560px',
        position: 'relative',
        margin: 'auto auto 16px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade('#fff', 0.85),
        '&:hover': {
            backgroundColor: fade('#fff', 0.95),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        zIndex: 0,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#95999D',
        cursor: 'pointer',
        paddingTop: '4px'
    },
    inputRoot: {
        color: '#2e3338',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
    card: {
        padding: theme.spacing(0),
        border: 'none',
        backgroundColor: 'none'
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing(5)
    },
    footerText:{
        paddingTop: theme.spacing(1),
        justifyContent: 'center',
        alignItems: 'center',

    },
    footerText2:{
        paddingTop: theme.spacing(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgFooter:{
        width: theme.spacing(10)
    },
    scroll : {
        paddingBottom: theme.spacing(5),
        justifyContent: 'flex-end',
        [theme.breakpoints.up('lg')]: {
            paddingBottom: theme.spacing(0),
        },
    },
}));

export default function GuildDiscovery (props) {
    const classes = useStyles();

    const inputSearch = (e) => {
        if(e.keyCode === 13){
            if (e.target.value !== "") {
                props.handleSearch();
            }

            // reset input form
            document.getElementById("search").value="";
        }
    };

    return (
        <React.Fragment>
            <Container className={classes.root} maxWidth={'lg'}>
                <Grid container spacing={1} >
                    <Grid id="back-to-top-anchor" item xs={12}>
                        <div className={classes.searchHeader}>
                            <CardMedia
                                className={classes.media}
                                image={require('../assets/images/guild-banner.png')}
                                title="Paella dish"
                            />
                            <div className={classes.headerContentWrapper}>
                                <div className={classes.headerContent}>
                                    <h3 style={{fontSize: '2vmax'}}>
                                        Find your community on Discord
                                    </h3>
                                    <h5 style={{fontSize: '1vmax'}}>
                                        From gaming, to music, to learning, there's a place for you.
                                    </h5>
                                    <Grid container className={classes.searchContainer} spacing={0}>
                                        <div className={classes.searchBox}>
                                            <div className={classes.search}>
                                                <div onClick={props.handleSearch} className={classes.searchIcon}>
                                                    <SearchIcon style={{zIndex: '9999'}}/>
                                                </div>
                                                <InputBase
                                                    placeholder="Explore Communities..."
                                                    name={"search"}
                                                    id={"search"}
                                                    autoComplete="off"
                                                    onKeyDown={(e) => inputSearch(e)}
                                                    onChange={(e) => props.changeSearch(e)}
                                                    classes={{
                                                        root: classes.inputRoot,
                                                        input: classes.inputInput,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography className={classes.text}>Popular Communities</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid className={classes.card} container spacing={2}>
                            {props.listGuilds.map((item, index) => (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
                                    <MediaCard {...props}
                                               name={item.name}
                                               desc={item.description}
                                               image={item.banner}
                                               category={item.category}
                                               guildID={item.id}
                                               changeRouter={(e) => props.changeRouter(e)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container className={classes.footer} spacing={1}>
                            <img className={classes.imgFooter} src={require('../assets/images/Bottom-Icon.svg')} alt="Go"/>
                        </Grid>
                        <Grid container className={classes.footerText}>
                            <Typography className={classes.footerText}>There are more communities out there!</Typography>
                        </Grid>
                        <Grid container className={classes.footerText2}>
                            <Link href="#"><Typography style={{color: '#2DA8EE'}} className={classes.footerText}>Try searching for them.</Typography></Link>
                        </Grid>
                    </Grid>

                </Grid>
                <div className={classes.scroll}>
                    <ScrollTop {...props}>
                        <Fab color="secondary" size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </div>
            </Container>
        </React.Fragment>
    );
}
