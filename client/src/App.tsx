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
import { Navbar } from './components'

import { useAuthContext } from './context/auth.context'

function App() {
  const { isLoading, user } = useAuthContext()

  if (isLoading) {
    return <div style={{ textAlign: 'center' }}>LOADING...</div>
  }

  return (
    <div>
      <Navbar />
      {user?.name}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />

        {/* private route */}
        <Route exact path='/user/:id' component={User} />
        <Route exact path='/user/:id/edit' component={UserEdit} />
        <Route exact path='/user/:id/reviews' component={Reviews} />
        <Route exact path='/reviews/new' component={CreateReview} />
        <Route exact path='/review/:id' component={Review} />
        <Route exact path='/review/:id/edit' component={EditReview} />
      </Switch>
    </div>
  )
}

export default App
