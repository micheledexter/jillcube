import React from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  data: state.admin.gameData,
  state,
});

const GameData = props => (
  <div className="GameData">
    <Paper>
      <h1 style={{ textAlign:"center", padding:"10px" }}>Game Data</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Prompt
            </TableCell>
            <TableCell>
              Game ID
            </TableCell>
            <TableCell>
              Answer (for game 2)
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <form>

          </form>
          {props.data.map((item, i) => 
          <TableRow key={i}>
            <TableCell>
              {item.prompt}
            </TableCell>
            <TableCell>
              {item.game_id}
            </TableCell>
            <TableCell>
              {item.answer}
            </TableCell>
            <TableCell>
              <Button
              id={item.id}
              variant="raised"
              color="secondary"
              onClick={() => props.dispatch({type: "DELETE_DATA_ENTRY", payload:item.id})}
              >Delete</Button>
            </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default connect(mapStateToProps)(GameData);