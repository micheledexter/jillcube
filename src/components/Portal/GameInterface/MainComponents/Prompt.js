import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GAME_ACTIONS } from '../../../../redux/actions/mainGameActions';

const mapStateToProps = state => ({
  prompt: state.mainGame.gamePrompt
});

class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: {},
    };
  }

  componentDidMount = () => {
    this.props.dispatch({ type:GAME_ACTIONS.NEW_PROMPT });
  }

  render() {

    const current = this.props.prompt;

    return(
      <div className="Prompt">
      ID: {current.id}<br />
      Prompt: {current.prompt}<br />
      Answer: {current.answer}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Prompt);