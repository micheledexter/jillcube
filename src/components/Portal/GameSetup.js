import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class GameSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }

  render() {
    return(
      <div className="GameSetup">
        <h1>GameSetup</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GameSetup);