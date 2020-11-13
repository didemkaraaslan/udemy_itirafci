import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import NoMatch from './components/NoMatch';
import 'semantic-ui-css/semantic.min.css';

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    enableLogging: false,
  },
  dispatch: store.dispatch,
};

const Root = () => {
  const dispatch = useDispatch();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={SignUp} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default Root;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Root />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
