import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
  mainGame: state.mainGame,
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class PlayerWaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      judge: this.props.mainGame.gameStatus.user,
      playerOne: '',
      playerTwo: '',
    };
  }

  checkForNewPlayers = () => {

  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper color="primary" className={classes.paper}>
              <h1>Definitely Not a Lie</h1>
              <h2>Try not to be fooled by the AI!</h2>
              <h3>
                In this game, Try not to be fooled by the computers in these
                trivia questions. These trivia questions definitely have some
                strange answers, so thinking outside of the box can actually help you!
              </h3>
              <h3>
                The player to fool the judge most with their answers will win!
              </h3>
            </Paper>
          </Grid>
          <Grid item xs={2}></Grid><Grid item xs={8}>
            <Paper className={classes.paper}>
              <h1>Judge</h1>
              <h2>{this.props.user.userName}</h2>
            </Paper>
          </Grid><Grid item xs={2}></Grid>
          <Grid item xs={4}></Grid><Grid item xs={4}>
            <Button
              id="new-game-button"
              variant="raised"
              color="primary"
              onClick={() => console.log('test')}
            >Start Game!</Button>
          </Grid><Grid item xs={4}></Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <h1>Player 1</h1>
              <h2>Watson (AI)</h2>
            </Paper>
          </Grid>
          <Grid item xs={2}>
          </Grid><Grid item xs={5}>
            <Paper className={classes.paper}>
              <h1>Player 2</h1>
              <h2>Holmes (AI)</h2>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PlayerWaiting.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(PlayerWaiting));