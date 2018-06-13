import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper color="primary" className={classes.paper}>
              <h1>Definitely Not a Lie</h1>
              <h2>Try to fool the judge with your lie!</h2>
              <h3>
                In this game, try to fool the judge by filling in the blank 
                for trivia questions. These trivia questions definitely have some
                strange answers, so giving bizarre answers can actually help you!
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
            <Paper className={classes.paper}>
              <h3>Status: {this.props.mainGame.gameStatus.status}</h3>
            </Paper>
          </Grid><Grid item xs={4}></Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <h1>Player 1</h1>
              <h2>Watson</h2>
            </Paper>
          </Grid><Grid item xs={2}>
          </Grid><Grid item xs={5}>
            <Paper className={classes.paper}>
              <h1>Player 2</h1>
              <h2>Holmes</h2>
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