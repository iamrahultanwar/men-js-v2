import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //TODO check user/admin login/token validations here
  const authToken = true;
  return (
    <>
      <Route
        {...rest}
        render={props =>
          authToken ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
};

export default PrivateRoute;
