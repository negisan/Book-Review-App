import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/auth.context'
import { UIProvider } from './context/UI.context'
import { ReviewsProvider } from './context/reviews.context'

ReactDOM.render(
  <Router>
    <UIProvider>
      <AuthProvider>
        <ReviewsProvider>
          <App />
        </ReviewsProvider>
      </AuthProvider>
    </UIProvider>
  </Router>,
  document.getElementById('root')
)
