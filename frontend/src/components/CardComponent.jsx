import React from 'react';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        maxHeight: 400,
        flexGrow: 1,
        borderRadius: 10,
        border: 'none',
        backgroundColor: 'none',
        '&:hover': {
            boxShadow: '0px 2px 31px -8px rgba(14,240,22,1)',
        }
    },
    media: {
        height: 160,
        backgroundColor: '#292B2F',
        border: 'none'

    },
    main: {
        overflowY: 'auto'
    },
    content: {
        backgroundColor: '#292B2F',
        color: '#fff',
    },
    fontColor: {
        color: '#ababab',
        textTransform:'none',
        fontSize: '12px'
    },
    infos: {
        color: '#949494',
        justifyContent: 'center',
        backgroundColor: '#292B2F',
        border: 'none',
        padding: theme.spacing(2),
    },
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    description: {
        fontSize: '12px',
        color: '#949494',
        height: '10vmin'
    },
    icon1:{
        fontSize: '15px',
        color: '#4FB581',
    },
    icon2:{
        fontSize: '15px',
        color: '#4560f0'
    },
    descDetail:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
}));


export default function MediaCard(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Card onClick={(e)=>props.changeRouter(props.guildID)} className={classes.root}>
                <CardActionArea className={classes.main}>
                    <CardMedia
                        className={classes.media}
                        image={props.image}
                        title={props.name}
                    />

                    <CardContent className={classes.content}>
                        <Grid item xs={12}>
                            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                                {props.name}
                            </Typography>
                            <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                                {props.desc}
                            </Typography>
                        </Grid>
                    </CardContent>

                    <Grid className={classes.infos} item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Grid className={classes.descDetail} container spacing={1}>
                                    <FiberManualRecordIcon className={classes.icon1} fontSize="small" />
                                    <Typography className={classes.fontColor}>
                                        &nbsp;12.345 Online
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid className={classes.descDetail} container spacing={1}>
                                    <FiberManualRecordIcon className={classes.icon2} fontSize="small" />
                                    <Typography className={classes.fontColor}>
                                        &nbsp;45.678 Members
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </CardActionArea>
            </Card>
        </React.Fragment>
    );
}
