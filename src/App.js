import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';

import Home from './components/Portal/Home';
import Main from './components/Portal/GameInterface/Main';

import './styles/main.css';

import { createMuiTheme } from '@material-ui/core/styles';
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

class App extends Component {
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
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
  };

  render() {
    return (
      <div className="App">
        <div>
          <Header title="Project Base" />
          <Router>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                path="/home"
                component={Home}
              />
              <Route
                path="/register"
                component={RegisterPage}
              />
              <Route
                path="/user"
                component={UserPage}
              />
              <Route
                path="/info"
                component={InfoPage}
              />
              <Route
                path="/login"
                component={LoginPage}
              />
              {/* OTHERWISE (no path!) */}
              <Route render={() => <h1>404</h1>} />

            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
