// @ts-nocheck
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {
  Review,
  Reviews,
  CreateReview,
  EditReview,
  Home,
  Login,
  Signup,
  User,
  UserEdit,
} from './pages'
import { Navbar, PrivateRoute, CustomLoader } from './components'

import { useAuthContext } from './context/auth.context'

function App() {
  const { isLoading, user } = useAuthContext()

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <div>
      <Navbar />
      {user?.name}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/user/:id' component={User} />
        <PrivateRoute exact path='/user/:id/edit' component={UserEdit} />
        <PrivateRoute exact path='/user/:id/reviews' component={Reviews} />
        <PrivateRoute exact path='/reviews/new' component={CreateReview} />
        <PrivateRoute exact path='/review/:id' component={Review} />
        <PrivateRoute exact path='/review/:id/edit' component={EditReview} />
      </Switch>
    </div>
  )
}

export default App
