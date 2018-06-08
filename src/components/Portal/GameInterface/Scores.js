import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Scores = props => (
  <Grid container spacing={24}>
    <Grid item xs={8} sm={4}>
      <Paper><h3><em>{props.player1}'s</em> score: </h3> 25 points</Paper>
    </Grid>
    <Grid item xs={8} sm={4}>
    </Grid>
    <Grid item xs={8} sm={4}>
      <Paper><h3><em>{props.player2}'s</em> score: </h3> 2532 points</Paper>
    </Grid>
  </Grid>
);

export default Scores;