import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function NotAuthRoute ({component: Component, isLoggedIn, ...rest}) {
  return (
    <Route 
      {...rest}
      render={props => !isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect 
          to={{
            pathname: '/'
          }}
        />
      )}
    />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(NotAuthRoute);