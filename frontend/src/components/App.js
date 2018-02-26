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
    postIds: PropTypes.array.isRequired,
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
          {this.props.postIds.map(postId => (
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

const mapStateToProps = state => ({
  postIds: Object.keys(state.posts || {}).filter((id) => {
    const { currentCategory, defaultCategory } = state.ui;
    return (currentCategory === defaultCategory || state.posts[id].category === currentCategory);
  }),
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
