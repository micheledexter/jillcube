import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    return(
      <div className="Main">
        <h1>Main</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);