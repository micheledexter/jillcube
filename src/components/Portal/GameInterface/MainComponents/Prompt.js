import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GAME_ACTIONS } from '../../../../redux/actions/mainGameActions';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  game: state.mainGame,
  player: state.user.userName,
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

  use = (item) => {
    switch(item) {
      case 'player':
        return this.props.player;
      case 'id':
        return this.props.game.gamePrompt.id;
      case 'prompt':
        return this.props.game.gamePrompt.prompt;
      case 'answer':
        return this.props.game.gamePrompt.answer;
      case 'frame1':
        return this.props.game.gameAnswer[0];
      case 'frame2':
        return this.props.game.gameAnswer[1];
      case 'frame3':
        return this.props.game.gameAnswer[2];
      default:
        console.log(`ERROR: ${item} not found`);
    }
  }

  render() {

    return(
      <div className="Prompt">
      {console.log("Player:", this.use('player'))}
      {console.log("ID:", this.use('id'))}
      {console.log("Prompt:", this.use('prompt'))}
      {console.log("Answer:", this.use('answer'))}
      {console.log(`Possible: ${this.use('frame1')}, ${this.use('frame2')}, ${this.use('frame3')}`)}
      {this.use('poop')}
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper color="primary">
            <h1>Round 1</h1>
            <h2>{this.use('prompt')}</h2>
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
            <h2>{this.use('frame1')}</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper>
            <h2>{this.use('frame2')}</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper>
            <h2>{this.use('frame3')}</h2>
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
            <h1>{this.use('player')}</h1>
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