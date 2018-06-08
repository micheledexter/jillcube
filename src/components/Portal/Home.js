import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';
import Main from './GameInterface/Main';
import Button from '@material-ui/core/Button';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    error: orange,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class Home extends Component {

  loginFocus = () => {
    document.getElementById('username-input').focus();
  }

  render() {
    return (
      <div className="Home" style={{ width: window.innerWidth, height: window.innerHeight-76 }}>
      <MuiThemeProvider theme={ theme }>
        {(window.innerWidth < 800 || window.innerHeight < 600) ? 
        <div id="screen-error" style={{ marginTop:(window.innerHeight/3) }}>
          <h1>Please use a larger screen</h1>
          <p>Screen size of at least 800x600</p>
          <p>Your screen size is: {window.innerWidth}x{window.innerHeight}</p>
        </div> :
        <div className="inset-shadow">
          {!this.props.user.userName ? <div id="menu-buttons">
            <Button
              id="login-to-play"
              size="large"
              onClick={this.loginFocus}
              style={{ marginTop:"20%" }}
              variant="raised"
            >Please log in to play!</Button>
          </div> : <div>
            <Main />
          </div>}
        </div>
        }
      </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);