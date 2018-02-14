import AppBar from 'material-ui/AppBar';
import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { connect } from 'react-redux';
import { getPosts, getCategories } from '../actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getPosts);
    this.props.dispatch(getCategories);
  }
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Readable"
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: Object.keys(state.categories || {}),
  posts: Object.keys(state.posts || {}).map(postId => state.posts[postId]),
});

export default connect(mapStateToProps)(App);
