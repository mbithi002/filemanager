import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import authService from './appwrite/auth'
import { Footer, Header, Spinner } from './components/components'
import { login, logout } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout)
      }

    }).finally(() => setLoading(false))
  }, [dispatch])

  return loading ? (
    <Spinner />
  ) : (
    <div className="min-h-screen flex flex-wrap content between bg-white text-white">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <div className="w-full block">
        <Footer />
      </div>
    </div>
  )
}

export default App
