import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function MovieCard({movie}) {
  //console.log(movie,'moviemovie')
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={movie.poster}
        title={movie.title}
        onClick={()=>history.push(`/movieDetails/${movie.id}`,{movie:movie})}
      />
    </Card>
  );
}
