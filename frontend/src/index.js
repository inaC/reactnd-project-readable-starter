import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Item from './components/Item';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <div>
        <Route exact path="/:category/:post_id" component={Item} />
        <Route exact path="/:category?" component={App} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
