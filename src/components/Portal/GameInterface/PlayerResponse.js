import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';



class PlayerResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight / 6,
      // width: window.innerWidth / 4,
    }
  }

  render() {
    let height = this.state.height;
    // let width = this.state.width;
    return (
      <Paper className="PlayerResponse">
        <div className="player-response-top" style={{ height:height/4 }}>
        {this.props.reveal ? 
          <h2 style={{ textAlign:"center" }}>{this.props.votes}</h2> : 
          <span />}
        </div>
        <hr />
        <div className="player-response-middle" style={{ height:height/2 }}>
          <h1 style={{ textAlign:"center" }}>{this.props.response}</h1>
        </div>
        <hr />
        <div className="player-response-bottom" style={{ height:height/4 }}>
        {this.props.reveal ? 
          <h2 style={{ textAlign:"center" }}>{this.props.player}</h2> : 
          <span />}
        </div>
      </Paper>
    )
  }
}

export default PlayerResponse;