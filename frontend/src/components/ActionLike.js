import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';

const ActionLike = props => (
  <IconButton
    tooltip="Like"
    onClick={props.action}
  >
    <ActionThumbUp color="limegreen" />
  </IconButton>
);

ActionLike.propTypes = {
  action: PropTypes.func.isRequired,
};

export default ActionLike;
