import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ApplicationBar from './ApplicationBar';
import Item from './Item';
import FormModal from './FormModal';
import './App.css';
import { getPosts } from '../actions';


class App extends Component {
  static propTypes = {
    postsToShow: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        <ApplicationBar />
        <div className="body">
          {this.props.postsToShow.map(postId => (
            <div className="item" key={postId}>
              <Item
                id={postId}
              />
            </div>
          ))}
          <div className="addItem">
            <FormModal addItem />
          </div>
        </div>
      </div>
    );
  }
}

const getPostsToShow = (state, sortBy) => {
  const displayAll = state.ui.currentCategory === state.ui.defaultCategory;
  let postsToShow = displayAll ? state.posts : state.postsByCategory[state.ui.currentCategory];
  postsToShow = Object.keys(postsToShow || {}).map(id => postsToShow[id]);
  const orderedPosts = postsToShow.sort((a, b) => b[sortBy] - a[sortBy]);
  return orderedPosts.map(post => post.id);
};

const mapStateToProps = state => ({
  postsToShow: getPostsToShow(state, state.ui.sortBy),
});


const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
