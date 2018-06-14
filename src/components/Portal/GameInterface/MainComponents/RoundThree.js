import React, { Component } from 'react';
import Header from '../../../Header/Header';
import { connect } from 'react-redux';

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
  location: state.location.location,
  state,
});

class RoundThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  updateWindowDimensions = () => {
    if (window.innerWidth !== this.state.width || window.innerHeight !== this.state.height) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  componentWillMount = () => {
    this.updateWindowDimensions();
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.updateWindowDimensions);
    this.setState({location: '1'});
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
  };

  render() {
    
    return (
      <div className="RoundThree" style={{ width: window.innerWidth, height: window.innerHeight - 76 }}>
        <Header showLogin="true" />
        <MuiThemeProvider theme={theme}>
          {(window.innerWidth < 800 || window.innerHeight < 600) ?
            <div id="screen-error" style={{ marginTop: (window.innerHeight / 3) }}>
              <h1>Please use a larger screen</h1>
              <p>Screen size of at least 800x600</p>
              <p>Your screen size is: {window.innerWidth}x{window.innerHeight}</p>
            </div> :
            <div className="inset-shadow">
              
            </div>
          }
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(mapStateToProps)(RoundThree);