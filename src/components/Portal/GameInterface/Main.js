import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
import '../../../styles/main.css';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import Responses from './Responses';
import Question from './Question';
import Scores from './Scores';

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing.unit * 2,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// });

// function AutoGrid(props) {
//   const { classes } = props;
// }

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
        <Question prompt="A rejected title in the Magic School Bus series: The Magic School Bus Goes to..." />
        <Responses player1={{name:"Watson", response:"The USSR"}} player2={{name:"Holmes", response:"North Korea"}} />
        <Scores player1="Watson" player2="Holmes"/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);