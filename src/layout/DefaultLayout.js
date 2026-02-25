import React, { useEffect, useState, useContext } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components'
import { getRequest } from '../Helpers'
import { useNavigate } from 'react-router-dom'
import { deleteCookie } from '../Hooks/cookie'
import { AppContext } from '../Context/AppContext'
import { useRoles } from '../Context/AuthContext'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const { setRole } = useRoles()
  const { setUser } = useContext(AppContext)
  useEffect(() => {
    const savedUser = localStorage.getItem('LMS')
    // if (!savedUser) return
    const parsedUser = JSON.parse(savedUser)
    setUserData(parsedUser)

    // 🔐 Fetch logged-in user profile
    getRequest('auth/profile')
      .then((res) => {
        const profile = res?.data?.data
        setUser(profile)
        setRole(profile?.role)
        console.log('Auth Profile res:', res?.data?.data)
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          // 🔴 Unauthorized → logout
          deleteCookie('LMS')
          deleteCookie('UserId')
          navigate('/login')
        } else {
          console.error('API Error:', error)
        }
      })
  }, [navigate, setUser])

  return (
    <div>
      <AppSidebar userData={userData} />

      <div
        className="wrapper d-flex flex-column min-vh-100"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <AppHeader userData={userData} />

        <div className="body flex-grow-1">
          <AppContent userData={userData} />
        </div>

        <AppFooter userData={userData} />
      </div>
    </div>
  )
}

export default DefaultLayout
