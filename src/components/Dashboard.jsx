import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
Dashboard.propTypes = {

};

function Dashboard(props) {
    const [cards, setCards] = useState([])
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    useEffect(()=>{
        fetch('https://wookie.codesubmit.io/movies', {
            method: 'GET',
            headers: new Headers({
                'Authorization' : 'Bearer Wookie2021'
            })
        }).then(res => res.json())
        .then(response =>{
            setCards(response.movies)
            const arr = response.movies.map(({genres}) => genres)
            //console.log(arr,'arr')
            //console.log(response,'response')
        })
    }, [])
    const getCards = () => (

        <Grid container spacing={3}>
            {cards.map(eachMovie => (
                <Grid item xs={3}>
                    <div className={classes.card}><MovieCard movie={eachMovie}/></div>
                </Grid>
            ))}
        </Grid>
    )
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {getCards()}
        </div>
    );
}

export default Dashboard;
