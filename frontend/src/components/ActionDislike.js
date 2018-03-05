import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

const ActionLike = props => (
  <IconButton
    tooltip="Dislike"
    onClick={props.action}
  >
    <ActionThumbDown color="red" />
  </IconButton>
);

ActionLike.propTypes = {
  action: PropTypes.func.isRequired,
};

export default ActionLike;
