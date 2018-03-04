import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { toggleSideBar } from '../actions';
import SideBar from './SideBar';
import SortMenu from './SortMenu';
import { capitalize, handlePluralizeWith } from '../util/stringPresenter';

class ApplicationBar extends Component {
  static propTypes = {
    currentCategory: PropTypes.string.isRequired,
    sideBarOpen: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
    displayPost: PropTypes.bool.isRequired,
  }

  setTitle = () => (
    `${this.props.currentCategory} ${handlePluralizeWith('post', !this.props.displayPost)}`
  )
  render() {
    return (
      <div className="applicationBar">
        <AppBar
          title={this.setTitle()}
          iconElementLeft={<IconButton tooltip="Categories"><NavigationMenu /></IconButton>}
          iconElementRight={<SortMenu />}
          onLeftIconButtonClick={() => this.props.toggleSideBar(!this.props.sideBarOpen)}
        />
        <SideBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentCategory: capitalize(state.ui.currentCategory),
  sideBarOpen: state.ui.sideBarOpen,
  displayPost: state.ui.displayPost,
});

const mapDispatchToProps = dispatch => ({
  toggleSideBar: boolean => dispatch(toggleSideBar(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationBar);
