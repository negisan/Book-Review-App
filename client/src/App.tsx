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
  ErrorPage,
  AllReviews,
} from './pages'
import {
  Sidebar,
  Navbar,
  PrivateRoute,
  CustomLoader,
  Footer,
  AllReviewList,
} from './components'

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
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme='dark'
      />
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/allreviews' component={AllReviews} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/user/:id' component={User} />
        <PrivateRoute exact path='/user/:id/reviews' component={Reviews} />
        <PrivateRoute exact path='/reviews/new' component={CreateReview} />
        <PrivateRoute exact path='/review/:id' component={Review} />
        <PrivateRoute exact path='/review/:id/edit' component={EditReview} />
        <Route path='*' component={ErrorPage} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
