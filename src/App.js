import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import LoginPage from './components/LoginPage/LoginPage';
// import RegisterPage from './components/RegisterPage/RegisterPage';
// import UserPage from './components/UserPage/UserPage';
// import InfoPage from './components/InfoPage/InfoPage';
import Admin from './components/Portal/Admin/Admin';
import Mobile from './components/Portal/Mobile/Mobile';

import Home from './components/Portal/Home';
import StartGame from './components/Portal/GameInterface/MainComponents/StartGame';
import RoundTwo from './components/Portal/GameInterface/MainComponents/RoundTwo';
import RoundThree from './components/Portal/GameInterface/MainComponents/RoundThree';
import FinalScore from './components/Portal/GameInterface/MainComponents/FinalScore';

import './styles/main.css';

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
          <Router>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                path="/mobile"
                component={Mobile}
              />
              <Route
                path="/home"
                component={Home}
              />
              <Route
                path="/admin"
                component={Admin}
              />
              <Route
                path="/game"
                component={StartGame}
              />
              <Route
                path="/2"
                component={RoundTwo}
              />
              <Route
                path="/3"
                component={RoundThree}
              />
              <Route
                path="/end"
                component={FinalScore}
              />
              {/* <Route
                path="/register"
                component={RegisterPage}
              /> */}
              {/* <Route
                path="/user"
                component={UserPage}
              /> */}
              {/* <Route
                path="/info"
                component={InfoPage}
              /> */}
              {/* <Route
                path="/login"
                component={LoginPage}
              /> */}
              {/* OTHERWISE (no path!) */}
              <Route render={() => <h1 style={{ color:"white" }}>404</h1>} />

            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
