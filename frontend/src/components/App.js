import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import PostList from './PostList';
import ApplicationBar from './ApplicationBar';
import Post from './Post';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div className="App">
        <ApplicationBar />
        <div className="body">
          <Route exact path="/:category/:post_id" component={Post} />
          <Route exact path="/:category?" component={PostList} />
        </div>
      </div>
    </Router>
  </MuiThemeProvider>
);
export default App;
