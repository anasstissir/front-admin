import {
    Route,
    Redirect,
    withRouter
  } from 'react-router-dom';

  import React from 'react'
  
  function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            isAuthenticated
              ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: '/user/login',
                    state: { from: location }
                  }}
                />
              ))
        }
      />
    );
  }
  
  export default withRouter(PrivateRoute);