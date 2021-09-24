// @ts-nocheck
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  Review,
  Reviews,
  CreateReview,
  EditReview,
  Home,
  Login,
  Signup,
  User,
} from './pages'
import { Sidebar, Navbar, PrivateRoute, CustomLoader } from './components'

import { useAuthContext } from './context/auth.context'
import { useUIContext } from './context/UI.context'

function App() {
  const { isLoading } = useAuthContext()
  const { isSidebarOpen } = useUIContext()

  if (isLoading) {
    return <CustomLoader />
  }

  return (
    <div>
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme='dark'
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/user/:id' component={User} />
        <PrivateRoute exact path='/user/:id/reviews' component={Reviews} />
        <PrivateRoute exact path='/reviews/new' component={CreateReview} />
        <PrivateRoute exact path='/review/:id' component={Review} />
        <PrivateRoute exact path='/review/:id/edit' component={EditReview} />
      </Switch>
    </div>
  )
}

export default App
