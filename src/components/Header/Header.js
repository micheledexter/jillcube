import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { triggerLogin, triggerLogout, formError, clearError } from '../../redux/actions/loginActions';
import axios from 'axios';
import { USER_ACTIONS } from '../../redux/actions/userActions';

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
  TextField: {
    floatingLabelColor: "#d1c4e9",
    focusColor: "#b39ddb",
  },
});


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  registration: false,
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  componentWillMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  login = event => {
    event.preventDefault();
    if (!this.state.username === '' || !this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
    this.setState({
      username: '',
      password: '',
    });
  }

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h6 className="alert" role="alert">
          {this.props.login.message}
        </h6>
      );
    }
    return (<span />);
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    return (
      <div className="Header">
        <MuiThemeProvider theme={theme}>
          <AppBar className="AppBar" position="static" color="default">
            <Toolbar style={{ minHeight: "60px", height: "60px" }}>
              <img className="il-block logo" src="images/jillcube-light.png" alt="placeholder" />
              <div className="login-logout il-block">
                {!this.props.user.userName ?
                  <div className="login il-block">
                    {this.renderAlert()}
                    <form onSubmit={this.login}>
                      <TextField
                        id="username-input"
                        label="Username"
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChangeFor('username')}
                      // style={{ backgroundColor:"aliceblue" }}
                      />
                      <TextField
                        id="password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor('password')}
                      />
                      <Button
                        type="submit"
                        name="submit"
                        variant="raised"
                        color="secondary"
                        onClick={this.login}
                      >Log in</Button>
                    </form>
                  </div>
                  : <Button
                    onClick={this.logout}
                    variant="raised"
                    color="primary">Logout</Button>}
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
