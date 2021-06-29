import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    ExploreIcon,
    MusicIcon,
    GamingIcon,
    EducationIcon,
    ScienceIcon,
    ContentIcon,
    AnimeMangaIcon,
    MoviesTVIcon,} from '../utils/CustomIcon';
import {Link} from "react-router-dom";


const myTab = [
    {
        name: 'Home',
        category: '',
        icon: <ExploreIcon/>,
    },
    {
        name: 'Gaming',
        category: 'Gaming',
        icon: <GamingIcon/>,
    },
    {
        name: 'Music',
        category: 'Music',
        icon: <MusicIcon/>,
    },
    {
        name: 'Education',
        category: 'Education',
        icon: <EducationIcon/>,
    },
    {
        name: 'Science',
        category: 'Science',
        icon: <ScienceIcon/>,
    },
    {
        name: 'Content Creator',
        category: 'Content Creator',
        icon: <ContentIcon/>,
    },
    {
        name: 'Anime & Manga',
        category: 'Anime & Manga',
        icon: <AnimeMangaIcon/>,
    },
    {
        name: 'Movies & TV',
        category: 'Movies & TV',
        icon: <MoviesTVIcon/>,
    }

];


const useStyles = makeStyles((theme) => ({
    titleTab: {
        margin: '16px',
        marginRight: theme.spacing(0),
        fontWeight: 700,
        fontSize: '24px',
        lineHeight: '30px',
        color: '#fff',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '120px'
        },
    },
    icon: {
        paddingRight: theme.spacing(2),
        textDecoration: 'none',
        alignItems: 'center',
    },
    itemInner: {
        marginBottom: theme.spacing(1),
        borderRadius: 5,
        color: '#B9BBBE',
        fontSize: '15px',
        fontWeight: 500,
        paddingTop: '5px',
        paddingRight: '10px',
        paddingBottom: '5px',
        paddingLeft: '12px',
        alignItems: 'center',
        display: 'flex',
        cursor: 'pointer',
        width: '89%',
        '&:active': {
            backgroundColor: '#7289da',
            outline: 'none',
        },
        '&:hover': {
            backgroundColor: '#36393F',
            outline: 'none',
        },
        '&:focus': {
            backgroundColor: '#7289DA'
        }
    },
    categoryItem: {
        paddingLeft: '8px',
        paddingRight: '8px',
        '&:focus': {
            outline: 'none',
        },
    }
}));

export default function GuildNavbar (props) {
    const classes = useStyles();
    return (
        <React.Fragment>

            {/*Sidebar Title*/}
            <h2 className={classes.titleTab}>Discover</h2>

            {/*Loop List Channel*/}
            {myTab.map((item, index) => (
                <Link key={index} to="#" onClick={() => props.handleRouter(item.category)}>
                    <div className={classes.categoryItem} role="listitem" tabIndex={index}>
                        <div className={classes.itemInner}>
                            <div className={classes.icon}>
                                {item.icon}
                            </div>
                            <div className="content">
                                <div className="nameAndDecorators">
                                    <div className="name">{item.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

        </React.Fragment>
    );
}