import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class HighScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }

  render() {
    return(
      <div className="HighScoreBoard">
        <h1>HighScoreBoard</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HighScoreBoard);