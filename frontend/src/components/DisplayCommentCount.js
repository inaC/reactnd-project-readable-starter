import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';

const DisplayVoteScore = props => (
  <IconButton
    tooltip={`Comments: ${props.commentCount}`}
    style={{ cursor: 'initial' }}
    disableTouchRipple
  >
    <CommunicationForum />
  </IconButton>
);

DisplayVoteScore.propTypes = {
  commentCount: PropTypes.number.isRequired,
};

export default DisplayVoteScore;
