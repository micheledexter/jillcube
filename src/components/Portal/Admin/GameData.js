import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
  state,
});

const GameData = props => (
  <div className="GameData">
    <h1>Game Data</h1>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              ID
            </TableCell>
            <TableCell>
              Prompt
            </TableCell>
            <TableCell>
              Game ID
            </TableCell>
            <TableCell>
              Answer (for game 2)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.state.admin.gameData.map((item, i) => 
          <TableRow key={i}>
            <TableCell>
              {item.id}
            </TableCell>
            <TableCell>
              {item.prompt}
            </TableCell>
            <TableCell>
              {item.game_id}
            </TableCell>
            <TableCell>
              {item.answer}
            </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default connect(mapStateToProps)(GameData);