import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication }) {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if ( authentication && authStatus !== authentication ) {
      navigate('/login')
    } else if (!authentication && authStatus !== authentication) {
      navigate('/')
    }
    setLoading(false)
  }, [authStatus, authentication, navigate])
  return loading ? <></> : <>{ children }</>
}

export default Protected