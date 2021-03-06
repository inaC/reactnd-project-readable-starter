import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import PostForm from './PostForm';
import { getPosts, setCategory, displayPost } from '../actions';
import paramTypePresent from '../util/urlParams';
import './App.css';

class PostList extends Component {
  static propTypes = {
    postsToShow: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    displayPost: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    postsEmpty: PropTypes.bool.isRequired,
    currentCategory: PropTypes.string.isRequired,
  }

  componentDidMount() {
    if (this.props.postsEmpty) this.props.getPosts();
    if (paramTypePresent(this.props.match, 'category') && this.props.match.params.category !== this.props.currentCategory) {
      this.props.setCategory(this.props.match.params.category);
    }
    this.props.displayPost(false);
  }

  render() {
    return (
      <div>
        {this.props.postsToShow.map(postId => (
          <div className="item" key={postId}>
            <Post id={postId} />
          </div>
        ))}
        <div className="addItem">
          <PostForm addItem />
        </div>
      </div>
    );
  }
}

const getPostsToShow = (state, sortBy, ownProps) => {
  if (paramTypePresent(ownProps.match, 'category') && !state.postsByCategory) return [];

  const displayAll = state.ui.currentCategory === state.ui.defaultCategory;
  let postsToShow = displayAll ? state.posts : state.postsByCategory[state.ui.currentCategory];
  postsToShow = Object.keys(postsToShow || {}).map(id => postsToShow[id]);
  postsToShow = postsToShow.sort((a, b) => b[sortBy] - a[sortBy]);
  return postsToShow.map(post => post.id);
};

const mapStateToProps = (state, ownProps) => ({
  postsToShow: getPostsToShow(state, state.ui.sortBy, ownProps),
  postsEmpty: state.posts === null,
  currentCategory: state.ui.currentCategory,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts),
  setCategory: category => dispatch(setCategory(category)),
  displayPost: boolean => dispatch(displayPost(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
