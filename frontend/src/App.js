import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import './App.css';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Title"
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
