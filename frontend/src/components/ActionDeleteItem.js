import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const ActionDeleteItem = props => (
  <IconButton
    tooltip="Delete"
    onClick={props.action}
    containerElement={props.containerElement}
  >
    <ActionDelete color="brown" />
  </IconButton>
);

ActionDeleteItem.propTypes = {
  action: PropTypes.func.isRequired,
  containerElement: PropTypes.object,
};

export default ActionDeleteItem;
