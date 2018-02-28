import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort';
import MenuItem from 'material-ui/MenuItem';

import { setSortByType } from '../actions';


class SortMenu extends Component {
  static propTypes = {
    setSortBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
  }

  render() {
    const sortByTypesDescription = {
      voteScore: 'Vote Score (biggest to lowest)',
      timestamp: 'Creation Date (newest to oldest)',
    };

    return (
      <IconMenu iconButtonElement={<IconButton tooltip="Sort by"><ContentSort color="white" /></IconButton>}>
        {Object.keys(sortByTypesDescription).map(type => (
          <MenuItem
            key={type}
            disabled={this.props.sortBy === type}
            onClick={() => this.props.setSortBy(type)}
            primaryText={sortByTypesDescription[type]}
          />
        ))}
      </IconMenu>
    );
  }
}

const mapStateToProps = state => ({
  sortBy: state.ui.sortBy,
});

const mapDispatchToProps = dispatch => ({
  setSortBy: type => dispatch(setSortByType(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortMenu);

