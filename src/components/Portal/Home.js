import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }

  render() {
    return(
      <div className="Home">
        <h1>Home</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);