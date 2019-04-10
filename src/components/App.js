import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import 'semantic-ui-css/semantic.min.css';
import Header from './Header';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import CreateTaskPage from './CreateTaskPage/CreateTaskPage';
import NotFoundPage from './NotFoundPage';
import reducer from '../reducer';
import Data from '../middlewares';
import { login } from '../AC';
import '../assets/styles/styles.sass';

const BrowserHistory = createBrowserHistory();

const store = createStore(reducer, applyMiddleware(Data));

// authorization
async function verifyToken() {
  if (localStorage.AdminJWT) {
    const decoded = await jwt.verify(localStorage.AdminJWT, 'secret');
    store.dispatch(login(decoded));
  }
}
verifyToken();

const App = () => (
  <Provider store={store}>
    <Router history={BrowserHistory}>
      <Fragment>
        <Header history={BrowserHistory} />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/create_task" exact component={CreateTaskPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
