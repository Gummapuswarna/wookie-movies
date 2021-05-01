import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
Dashboard.propTypes = {

};

function Dashboard({ searchedData }) {
    const [cards, setCards] = useState([]);

    const [uniqueGenres, setUniqueGenres] = useState([]);
    const [initialRes, setIntitalRes] = useState([]);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        genre: {
            marginLeft: '0px'
        }
    }));
    useEffect(() => {
        formatData(searchedData || initialRes)
    }, [searchedData])
    const formatData = (response) => {
        let allGenreArray = [];
        response && response.movies && response.movies.length > 0 && response.movies.map(({ genres }) => allGenreArray = allGenreArray.concat(genres))

        const uniqueGenres = [...new Set(allGenreArray)]

        setUniqueGenres(uniqueGenres)
        const newArr = []
        uniqueGenres.forEach(x => {
            response && response.movies && response.movies.length > 0 && response.movies.forEach(y => {
                if (y.genres.includes(x)) {
                    newArr.push({
                        genre: x,
                        movie: y
                    })
                }
            })

        })

        const groupedArr = newArr.reduce((result, item) => ({
            ...result,
            [item['genre']]: [
                ...(result[item['genre']] || []),
                item,
            ]
        }),
            {}
        )
        setCards(Object.entries(groupedArr))
    }
    useEffect(() => {
        fetch('https://wookie.codesubmit.io/movies', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer Wookie2021'
            })
        }).then(res => res.json())
            .then(response => {
                setIntitalRes(response)
                formatData(response)
            })
    }, [])
    const getCards = () => (

        <Grid container spacing={3}>
            {cards && cards.length > 0 && cards.map(eachGenre => (
                <>
                    <Grid item xs={12} alignContent="flex-start" className={classes.genre}><Typography variant="h4" component="h4">{eachGenre[0]}</Typography></Grid>
                    {eachGenre[1].map(eachMovie => (
                        <Grid item xs={3}>
                            <div className={classes.card}><MovieCard movie={eachMovie.movie} /></div>
                        </Grid>
                    ))
                    }
                </>
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
