import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import { toggleSideBar } from '../actions';
import CategoriesMenu from './CategoriesMenu';

class SideBar extends Component {
  static propTypes = {
    toggleSideBar: PropTypes.func.isRequired,
    sideBarOpen: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className="sideBar">
        <Drawer
          open={this.props.sideBarOpen}
          docked={false}
          onRequestChange={sideBarOpen => this.props.toggleSideBar(sideBarOpen)}
        >
          <CategoriesMenu />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sideBarOpen: state.ui.sideBarOpen,
});

const mapDispatchToProps = dispatch => ({
  toggleSideBar: boolean => dispatch(toggleSideBar(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
