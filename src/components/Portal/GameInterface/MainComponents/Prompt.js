import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GAME_ACTIONS } from '../../../../redux/actions/mainGameActions';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  game: state.mainGame,
});

class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      color1: 'inherit',
      color2: 'inherit',
    }
  }

  componentDidMount = () => {
    this.props.dispatch({ type:GAME_ACTIONS.NEW_PROMPT });
  }

  render() {

    const current = this.props.game.gamePrompt;
    const answers = this.props.game.gameAnswer;

    return(
      <div className="Prompt">
      {console.log("ID:", current.id)}
      {console.log("Prompt:", current.prompt)}
      {console.log("Answer:", current.answer)}
      {console.log("Possible:", answers[0], answers[1], answers[2])}
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper color="primary">
            <h1>Round 1</h1>
            <h2>{current.prompt}</h2>
          </Paper>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <h2>{answers[0]}</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper>
            <h2>{answers[1]}</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper>
            <h2>{answers[2]}</h2>
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid><Grid item xs={4}>
        </Grid><Grid item xs={4}></Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <h1>Watson</h1>
            <h2>0 points</h2>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <h1>kochab</h1>
            <h2>0 points</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper>
            <h1>Holmes</h1>
            <h2>0 points</h2>
          </Paper>
        </Grid>

        <Grid item xs={5}>
        </Grid>
        <Grid item xs={3}>{this.state.clicked ?
          <a href="/2">
          <Button 
            variant="raised"
            color="primary"
          >Next</Button></a> : null}
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Prompt);