import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import { toggleSideBar } from '../actions';
import CategoriesMenu from './CategoriesMenu';

const SideBar = props => (
  <div className="sideBar">
    <Drawer
      open={props.sideBarOpen}
      docked={false}
      onRequestChange={sideBarOpen => props.toggleSideBar(sideBarOpen)}
    >
      <CategoriesMenu />
    </Drawer>
  </div>
);

SideBar.propTypes = {
  toggleSideBar: PropTypes.func.isRequired,
  sideBarOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  sideBarOpen: state.ui.sideBarOpen,
});

const mapDispatchToProps = dispatch => ({
  toggleSideBar: boolean => dispatch(toggleSideBar(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
