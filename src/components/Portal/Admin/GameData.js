import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { ADMIN_ACTIONS } from '../../../redux/actions/adminActions';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  data: state.admin.gameData,
  state,
});

class GameData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPrompt: '',
      newAnswer: '',
    }
  }

  handleChangeFor = property => event => {
    this.setState({
      [property]: event.target.value,
    });
  };

  submitNewEntry = (prompt, answer) => {
    const type = 'NEW_SUBMISSION';
    const payload = {
      prompt: this.state.newPrompt,
      answer: this.state.newAnswer,
    };
    const action = {
      type: type,
      payload: payload,
    };
    this.props.dispatch(action);
    this.setState({
      newPrompt: '',
      newAnswer: '',
    });
  };

  render() {
    return (
      <div className="GameData">
        <Paper>
          <h1 style={{ textAlign: "center", padding: "10px" }}>Game Data</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Prompt
            </TableCell>
                {/* <TableCell>
                  Game ID
            </TableCell> */}
                <TableCell>
                  Answer
            </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell>
                    <Input
                      type="text"
                      name="newPrompt"
                      placeholder="New Prompt"
                      value={this.state.newPrompt}
                      onChange={this.handleChangeFor('newPrompt')}
                    />
                  </TableCell>
                  {/* <TableCell>2
                  </TableCell> */}
                  <TableCell>
                    <Input
                      type="text"
                      name="newAnswer"
                      placeholder="Answer"
                      value={this.state.newAnswer}
                      onChange={this.handleChangeFor('newAnswer')}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      id="newSubmission"
                      variant="raised"
                      color="primary"
                      onClick={this.submitNewEntry}
                    >Submit</Button>
                  </TableCell>
                </TableRow>
              {this.props.data.map((item, i) =>
                <TableRow key={i}>
                  <TableCell>
                    {item.prompt}
                  </TableCell>
                  {/* <TableCell>
                    {item.game_id}
                  </TableCell> */}
                  <TableCell>
                    {item.answer}
                  </TableCell>
                  <TableCell>
                    <Button
                      id={item.id}
                      variant="raised"
                      color="secondary"
                      onClick={() => this.props.dispatch({ type: ADMIN_ACTIONS.DELETE_DATA_ENTRY, payload: item.id })}
                    >Delete</Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GameData);