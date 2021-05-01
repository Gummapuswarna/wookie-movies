import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useLocation } from 'react-router';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  posterWidth: {
    maxWidth: 345,
  },
  card: {
    textAlign: 'center',
    height: '100px',
    width: '100px'
  }
});

export default function MovieDetails(props) {

  const classes = useStyles();
  const location = useLocation();
  const movieObj = location.state.movie
  console.log(location, 'propsprops')
  const { poster, title, imdb_rating, released_on, length, director, cast, overview } = movieObj
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <img src={poster} />

        </Grid>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {title} ({imdb_rating})
        </Typography>
              <Typography variant="h5" component="h2">
                {released_on.substring(0, 4)} | {length} | {director}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Cast: {cast.toString()}
              </Typography>
              <Typography variant="body2" component="p">
                Movie Description : {overview}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
