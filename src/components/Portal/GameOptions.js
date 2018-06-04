import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class GameOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }

  render() {
    return(
      <div className="GameOptions">
        <h1>GameOptions</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GameOptions);