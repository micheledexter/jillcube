import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../../redux/actions/userActions';
import Button from '@material-ui/core/Button';
import PlayerWaiting from './PlayerWaiting';

const mapStateToProps = state => ({
  user: state.user,
  gameStatus: state.mainGame.gameStatus,
});

class GameReady extends Component {
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
        <div className="start-game" style={{ textAlign:"center" }}>
          {!this.props.gameStatus.status ?
          <Button
              id="start-game"
              className="menu-button"
              size="large"
              style={{ marginTop:"20%", marginLeft:"auto", marginRight:"auto" }}
              variant="raised"
              color="primary"
              onClick={() => this.props.dispatch({type: 'START_GAME', payload:this.props.user.userName})}
            >Start a new game!</Button>
            : <PlayerWaiting /> }
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
export default connect(mapStateToProps)(GameReady);
