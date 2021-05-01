import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
Dashboard.propTypes = {

};

function Dashboard(props) {
    const [cards, setCards] = useState([]);
    const [uniqueGenres, setUniqueGenres] = useState([]);
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
            marginLeft:'0px'
        }
    }));
    useEffect(() => {
        fetch('https://wookie.codesubmit.io/movies', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer Wookie2021'
            })
        }).then(res => res.json())
            .then(response => {

                let allGenreArray = [];
                console.log(response.movies, 'allGenreArray')
                response.movies.map(({ genres }) => allGenreArray = allGenreArray.concat(genres))
                console.log(allGenreArray, 'allGenreArray')
                const uniqueGenres = [...new Set(allGenreArray)]
                setUniqueGenres(uniqueGenres)
                console.log(uniqueGenres, 'arr')
                const newArr = []
                uniqueGenres.forEach(x => {
                    response.movies.forEach(y => {
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
                console.log(Object.entries(groupedArr), 'newArr')
                setCards(Object.entries(groupedArr))
            })
    }, [])
    const getCards = () => (

        <Grid container spacing={3}>
            {cards.map(eachGenre => (
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
