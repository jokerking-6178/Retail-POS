import React, { useContext } from 'react'
import Menubar from './components/Menubar/Menubar'
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import { AppContext } from './context/AppContext'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  const location = useLocation()
  const { auth } = useContext(AppContext)

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!auth?.token) {
      return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />
    }

    return children
  }

  const LoginRoute = ({ children }) => {
    if (auth?.token) {
      return <Navigate to="/dashboard" replace />
    }
    return children
  }

  return (
    <>
      {location.pathname !== '/login' && <Menubar />}

      <Toaster />

      <Routes>

        <Route
          path="/"
          element={
            auth?.token
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/category"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ManageCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/items"
          element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <ManageItems />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
