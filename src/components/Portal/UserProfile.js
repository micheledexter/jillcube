import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
  }

  render() {
    return(
      <div className="UserProfile">
        <h1>UserProfile</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserProfile);