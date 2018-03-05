import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';

const ActionViewItem = props => (
  <IconButton
    tooltip="View"
    containerElement={props.containerElement}
    disabled={props.disabled}
  >
    <ActionVisibility color="mediumpurple" />
  </IconButton>
);

ActionViewItem.propTypes = {
  containerElement: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ActionViewItem;
