import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GAME_ACTIONS } from '../../../../redux/actions/mainGameActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
  scores: state.mainGame.scores,
  player: state.user.userName,
});

class Prompt extends Component {

  componentDidMount = () => {
    this.props.dispatch({ type:GAME_ACTIONS.NEW_PROMPT });
  }

  tallyScores = () => {
    const player = this.props.scores.player;
    const watson = this.props.scores.watson;
    const holmes = this.props.scores.holmes;
    const name = this.props.player;
    if (player > watson && player > holmes) {
      return <h2>{name} with {player} points!</h2>;
    } else if (watson > player && watson > holmes) {
      return <h2>Watson with {watson} points!</h2>;
    } else if (holmes > player && holmes > watson) {
      return <h2>Holmes with {holmes} points!</h2>;
    } else if (player === watson && player === holmes) {
      return <h2>Nobody! It was a 3-way tie!</h2>;
    } else if (player === watson && player > holmes) {
      return <h2>Both {name} AND Watson with {player} points!</h2>;
    } else if (player === holmes && player > watson) {
      return <h2>Both {name} AND Holmes with {player} points!</h2>;
    } else if (watson === holmes && watson > player) {
      return <h2>Both Watson AND Holmes with {watson} points!</h2>;
    } else {
      return <h2>ERROR calculating</h2>;
    }
  }

  render() {

    // const current = this.props.prompt;

    return(
      <div className="Prompt">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper color="primary">
            <h1>The winner is...</h1>
            {this.tallyScores()}
          </Paper>
        </Grid>
      </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Prompt);