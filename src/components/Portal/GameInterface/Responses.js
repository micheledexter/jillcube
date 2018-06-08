import React from 'react';
import Grid from '@material-ui/core/Grid';
import PlayerResponse from './PlayerResponse';

const Responses = props => (
  <Grid container spacing={24}>
    <Grid item xs={12} sm={6}>
      <PlayerResponse response={props.player1.response} reveal={true} player={props.player1.name} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PlayerResponse response={props.player2.response} reveal={true} player={props.player2.name} />
    </Grid>
  </Grid>
);

export default Responses;