import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Question = props => (
  <Grid container spacing={24} style={{ padding:"10px" }}>
    <Grid item xs={2} sm={1}>
    </Grid>
    <Grid item xs={20} sm={10}>
      <Paper className="question"><h1>{props.prompt}</h1></Paper>
    </Grid>
    <Grid item xs={2} sm={1}>
    </Grid>
  </Grid>
);

export default Question;