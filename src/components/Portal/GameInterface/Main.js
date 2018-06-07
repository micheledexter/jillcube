import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import '../../../styles/main.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

function AutoGrid(props) {
  const { classes } = props;
}

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ''
    };
  }

  render() {
    return (
      <div className="Main">
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className="response">test</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);