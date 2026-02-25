import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

  return (
    <div className="not-fount-container">
        <div className="not-fount-content">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Oops !Page not found</h2>
            <p className="not-found-message">
                the page you are looking for is dosen't exists or has been moved
            </p>
            <button className="not-found-button" onClick={() => navigate('/')}>Go To Homepage</button>
        </div>
    </div>
  )
}

export default NotFound