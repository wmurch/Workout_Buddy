import React from 'react'
import { Route, Redirect, withRouter } from 'react-router'
import Auth from './Auth'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        console.log(Auth.isAuthenticated())
        if (Auth.isAuthenticated()) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/build',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
      }}
    />
  )
}
export default withRouter(ProtectedRoute)
