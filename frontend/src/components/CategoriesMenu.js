import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import { getCategories, setCategory } from '../actions';
import capitalize from '../util/stringPresenter';

class CategoriesMenu extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="categoriesMenu">
        {this.props.categories.map(category => (
          <MenuItem
            key={category}
            onClick={() => this.props.setCategory(category)}
            disabled={this.props.currentCategory === category}
          > {capitalize(category)}
          </MenuItem>
        ))}
      </div>
    );
  }
}

const formatCategories = (state) => {
  const { defaultCategory } = state.ui;
  const categories = [defaultCategory].concat(Object.keys(state.categories || {}));
  return categories;
};

const mapStateToProps = state => ({
  categories: formatCategories(state),
  currentCategory: state.ui.currentCategory,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories),
  setCategory: category => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesMenu);
