import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogin, triggerLogout, formError, clearError } from '../../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

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
      this.props.dispatch(triggerLogin(this.state.username, this.state.passwod));
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
      <div>
        {!this.props.user.userName ? 
          <div>
            { this.renderAlert() }
            <form onSubmit={this.login}>
              <h1>Login</h1>
              <div>
                <label htmlFor="username">
                  Username:
                  <input
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
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
                </label>
              </div>
              <div>
                <input
                  type="submit"
                  name="submit"
                  value="Log In"
                />
              </div>
            </form>
          </div>
          :
          <div>
          <button>Join game</button>
          <button onClick={() => this.props.dispatch(triggerLogout())}>Logout</button>
          </div>
          }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Mobile);