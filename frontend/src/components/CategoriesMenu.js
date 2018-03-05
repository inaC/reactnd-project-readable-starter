import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import { getCategories, setCategory } from '../actions';
import { capitalize } from '../util/stringPresenter';

class CategoriesMenu extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    currentCategory: PropTypes.string.isRequired,
    defaultCategory: PropTypes.string.isRequired,
    displayPost: PropTypes.bool.isRequired,
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
            containerElement={<Link to={`/${category === this.props.defaultCategory ? '' : category}`}></Link>}
            disabled={this.props.currentCategory === category && !this.props.displayPost}
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
  defaultCategory: state.ui.defaultCategory,
  displayPost: state.ui.displayPost,
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories),
  setCategory: category => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesMenu);
