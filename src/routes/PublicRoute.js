import {
    Route,
    Redirect,
    withRouter
  } from 'react-router-dom';
  import React from 'react'
  
  function PublicRoute({ children, isAuthenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            !isAuthenticated ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/app',
                  state: { from: location }
                }}
              />
            ))
        }
      />
    );
  }
  
  export default withRouter(PublicRoute);