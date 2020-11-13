import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../components/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser, isLoadingUser } = useSelector((state) => state.auth);

  if (isLoadingUser) {
    return <Spinner />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
