import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'editor', password: 'editor123', role: 'Editor' },
  { username: 'viewer', password: 'viewer123', role: 'Viewer' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  function login(username, password) {
    const foundUser = mockUsers.find(
      (entry) => entry.username === username && entry.password === password
    )

    if (!foundUser) {
      return { success: false, message: 'Invalid credentials' }
    }

    setUser({ username: foundUser.username, role: foundUser.role })
    return { success: true }
  }

  function logout() {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
