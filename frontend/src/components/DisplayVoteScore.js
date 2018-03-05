import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionStars from 'material-ui/svg-icons/action/stars';

const DisplayVoteScore = props => (
  <IconButton
    tooltip={`Vote score: ${props.voteScore}`}
    style={{ cursor: 'initial' }}
    disableTouchRipple
  >
    <ActionStars />
  </IconButton>
);

DisplayVoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
};

export default DisplayVoteScore;
