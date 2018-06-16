import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GAME_ACTIONS } from '../../../../redux/actions/mainGameActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  prompt: state.mainGame.gamePrompt
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

    // const current = this.props.prompt;

    return(
      <div className="Prompt">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper color="primary">
            <h1>Final Round</h1>
            <h2>In Japan, there's a spa that offers _____ baths.</h2>
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
            <h2>lava</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper>
            <h2>mowed grass clippings</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper
            onClick={() => this.setState({clicked: 'true', color: "green"})}
          >
            <h2 style={{backgroundColor:this.state.color}}>ramen noodle</h2>
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
            <h2>100 points</h2>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <h1>kochab</h1>
            <h2>{this.state.clicked ? "150 points" : "0 points"}</h2>
          </Paper>
        </Grid><Grid item xs={4}>
          <Paper>
            <h1>Holmes</h1>
            <h2>100 points</h2>
          </Paper>
        </Grid>

        <Grid item xs={5}>
        </Grid>
        <Grid item xs={3}>{this.state.clicked ?
          <a href="/end">
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