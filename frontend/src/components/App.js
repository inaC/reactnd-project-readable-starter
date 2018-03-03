import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ItemList from './ItemList';
import ApplicationBar from './ApplicationBar';
import Item from './Item';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div className="App">
        <ApplicationBar />
        <div className="body">
          <Route exact path="/:category/:post_id" component={Item} />
          <Route exact path="/:category?" component={ItemList} />
        </div>
      </div>
    </Router>
  </MuiThemeProvider>
);
export default App;
