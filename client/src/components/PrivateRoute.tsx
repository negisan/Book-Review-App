import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute: React.FC = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('user')) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
        return <Component {...props} />
      }}
    ></Route>
  )
}

export default PrivateRoute
