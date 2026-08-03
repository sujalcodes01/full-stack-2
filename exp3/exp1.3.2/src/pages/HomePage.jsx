import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <main>
      <h1>React RBAC Demo</h1>
      <p>Login as one of the roles to see protected routes and role-specific UI.</p>
      {user ? (
        <>
          <p>Signed in as <strong>{user.username}</strong> ({user.role})</p>
          <nav>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </main>
  )
}
