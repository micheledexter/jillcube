import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GAME_ACTIONS } from '../../../../redux/actions/mainGameActions';
import { Link } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  round: state.mainGame.prompt1,
  player: state.user.userName,
  scores: state.mainGame.scores,
  state,
});
class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      correctBg: 'inherit',
      incorrectBg: 'inherit',
      correctFc: 'inherit',
      incorrectFc: 'inherit',
    }
  }

  componentDidMount = () => {
    this.props.dispatch({ type: GAME_ACTIONS.NEW_PROMPT });
    this.props.dispatch({ type: GAME_ACTIONS.SET_PLAYER_SCORE, payload: 0 });
    this.props.dispatch({ type: GAME_ACTIONS.SET_WATSON_SCORE, payload: 0 });
    this.props.dispatch({ type: GAME_ACTIONS.SET_HOLMES_SCORE, payload: 0 });
  }

  use = (item) => {
    switch (item) {
      case 'player':
        return this.props.player;
      case 'id':
        return this.props.round.id;
      case 'prompt':
        return this.props.round.prompt;
      case 'answer':
        return this.props.round.answer;
      case 'frame1':
        return this.props.round.possible1;
      case 'frame2':
        return this.props.round.possible2;
      case 'frame3':
        return this.props.round.possible3;
      default:
        console.log(`ERROR: ${item} not found`);
    }
  }

  clickAnswer = (answer) => {
    if (!this.state.clicked) {
      if (answer === this.use('answer')) {
        this.props.dispatch({ type: GAME_ACTIONS.SET_PLAYER_SCORE, payload: this.props.scores.player + 150 });
      } else {
        const number = Math.ceil(Math.random() * 2);
        if (number === 1) {
          this.props.dispatch({ type: GAME_ACTIONS.SET_WATSON_SCORE, payload: this.props.scores.watson + 100 });
        } else {
          this.props.dispatch({ type: GAME_ACTIONS.SET_HOLMES_SCORE, payload: this.props.scores.holmes + 100 });
        }
      }
      this.setState({
        clicked: true,
        correctBg: 'green',
        incorrectBg: 'red',
        correctFc: 'white',
        incorrectFc: 'grey',
      });
    }
  }

  frame = (frame) => {
    if (frame === this.use('answer')) {
      return <h2 style={{ backgroundColor:this.state.correctBg, color:this.state.correctFc }}>{frame}</h2>
    } else {
      return <h2 style={{ backgroundColor:this.state.incorrectBg, color:this.state.incorrectFc }}>{frame}</h2>
    }
  }

  render() {

    return (
      <div className="Prompt">
        <div style={{ height: window.innerHeight / 4 }}>
          <Paper className="prompt-banner" color="primary">
            <h1>Round 1</h1>
            <h2>{this.use('prompt')}</h2>
          </Paper>
        </div>
        <div style={{ height: window.innerHeight / 4 }}>
          <div style={{ display: 'inline-block', width: window.innerWidth / 3.1, margin: '1px' }}>
            <Paper
              onClick={() => this.clickAnswer(this.use('frame1'))}
              className="frame">
              {this.frame(this.use('frame1'))}
            </Paper>
          </div>
          <div style={{ display: 'inline-block', width: window.innerWidth / 3.1, margin: '2px' }}>
            <Paper
              onClick={() => this.clickAnswer(this.use('frame2'))}
              className="frame">
              {this.frame(this.use('frame2'))}
            </Paper>
          </div>
          <div style={{ display: 'inline-block', width: window.innerWidth / 3.1, margin: '1px' }}>
            <Paper
              onClick={() => this.clickAnswer(this.use('frame3'))}
              className="frame">
              {this.frame(this.use('frame3'))}
            </Paper>
          </div>
        </div>
        <div style={{ height: window.innerHeight / 4 }}>
          <div style={{ display: 'inline-block', width: window.innerWidth / 3.1, margin: '1px' }}>
            <Paper className="score">
              <h1>Watson</h1>
              <h2>{this.props.scores.watson} points</h2>
            </Paper>
          </div>
          <div style={{ display: 'inline-block', width: window.innerWidth / 3.1, margin: '2px' }}>
            <Paper className="score">
              <h1>{this.use('player')}</h1>
              <h2>{this.props.scores.player} points</h2>
            </Paper>
          </div>
          <div style={{ display: 'inline-block', width: window.innerWidth / 3.1, margin: '1px' }}>
            <Paper className="score">
              <h1>Holmes</h1>
              <h2>{this.props.scores.holmes} points</h2>
            </Paper>
          </div>
        </div>
        {this.state.clicked ? <div>
          <Link to="/2" style={{ marginLeft: 'auto' }}>
            <Button
              variant="raised"
              color="primary"
            >Next</Button>
          </Link>
          <div style={{ display: 'inline-block', backgroundColor: '#2228', marginLeft: '10px', padding: '10px' }}>
            <h3 style={{ color: 'white' }}>Answer: {this.use('answer')}</h3>
          </div>
        </div> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Prompt);