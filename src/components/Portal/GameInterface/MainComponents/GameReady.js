import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="start-game">
          <Button
              id="start-game"
              className="menu-button"
              size="large"
              style={{ marginTop:"20%", marginLeft:"auto", marginRight:"auto" }}
              variant="raised"
              color="primary"
              onClick={() => this.props.dispatch({type: 'START_GAME', payload:this.props.user.username})}
            >Start a new game!</Button>
        </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
