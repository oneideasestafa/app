import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute ({component: Component, isLoggedIn, ...rest}) {
  console.log('isLoggedIn', isLoggedIn);

  return (
    <Route 
      {...rest}
      render={props => isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect 
          to={{
            pathname: '/dashboard',
            state: {from: props.location},
          }}
        />
      )}
    />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);