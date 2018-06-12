import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, triggerLogout, formError, clearError } from '../../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Header from '../../Header/Header';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class Mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  login = event => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2 className="alert" role="alert">
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return(
      <div className="Mobile">
      <Header showLogin="false" />
        <p>{JSON.stringify(this.props)}<br />{JSON.stringify(this.state)}</p>
        {!this.props.user.userName ? 
          <div>
            { this.renderAlert() }
            <form onSubmit={this.login}>
              <h1>Login</h1>
              <div>
                <label htmlFor="username">
                  Username:
                  <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  Password:
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
                </label>
              </div>
              <div>
                <Input
                  type="submit"
                  name="submit"
                  value="Log In"
                />
              </div>
            </form>
          </div>
          :
          <div>
          <Button
            variant="raised"
            color="secondary"
          >Join game</Button><br />
          <Button 
            variant="raised"
            color="primary"
            onClick={() => this.props.dispatch(triggerLogout())}
          >Logout</Button>
          </div>
          }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Mobile);