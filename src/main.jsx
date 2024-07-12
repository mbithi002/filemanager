import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { VotingDashboard } from './components/components.js'
import Protected from './components/layout/AuthLayout.jsx'
import './index.css'
import { Dashboard, Home, Login, NotFound, Signup } from './pages/pages.js'
import store from './store/store.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Protected authentication={true}>
            <Dashboard />
          </Protected>
        )
      },
      {
        path: '/votes',
        element: (
          <Protected authentication={true}>
            <VotingDashboard />
          </Protected>
        )
      },
      {
        path: 'not-found',
        element: (
          <Protected authentication={false}>
            <NotFound />
          </Protected>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
