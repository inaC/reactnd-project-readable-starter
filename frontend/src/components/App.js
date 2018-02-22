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
    posts: PropTypes.array.isRequired,
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
          {this.props.posts.map(post => (
            <div className="item" key={post.id}>
              <Item
                author={post.author}
                id={post.id}
                title={post.title}
                voteScore={post.voteScore}
                commentCount={post.commentCount}
              />
            </div>
          ))}
          <div className="addItem">
            <FormModal />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: Object.keys(state.posts || {}).map(postId => state.posts[postId]),
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
