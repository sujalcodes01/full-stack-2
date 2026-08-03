import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}! Your role is <strong>{user.role}</strong>.</p>
      <div className="action-grid">
        <Link to="/viewer">Viewer Page</Link>
        {(user.role === 'Admin' || user.role === 'Editor') && (
          <Link to="/editor">Editor Page</Link>
        )}
        {user.role === 'Admin' && <Link to="/admin">Admin Page</Link>}
      </div>
      <button onClick={logout}>Sign out</button>
    </main>
  )
}
