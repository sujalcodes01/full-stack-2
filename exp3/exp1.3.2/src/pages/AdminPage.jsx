import { useAuth } from '../auth/AuthContext'

export default function AdminPage() {
  const { user } = useAuth()

  return (
    <main>
      <h1>Admin Page</h1>
      <p>This page is reserved for <strong>Admin</strong> users only.</p>
      <p>{user.username} can manage system settings and user roles.</p>
    </main>
  )
}
