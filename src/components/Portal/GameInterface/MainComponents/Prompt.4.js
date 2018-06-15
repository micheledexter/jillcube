import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GAME_ACTIONS } from '../../../../redux/actions/mainGameActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
  prompt: state.mainGame.gamePrompt
});

class Prompt extends Component {

  componentDidMount = () => {
    this.props.dispatch({ type:GAME_ACTIONS.NEW_PROMPT });
  }

  render() {

    const current = this.props.prompt;

    return(
      <div className="Prompt">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper color="primary">
            <h1>The winner is...</h1>
            <h2>kochab with 150 points!</h2>
          </Paper>
        </Grid>
      </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Prompt);