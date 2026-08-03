import { useAuth } from '../auth/AuthContext'

export default function ViewerPage() {
  const { user } = useAuth()

  return (
    <main>
      <h1>Viewer Page</h1>
      <p>All signed-in users can access this page.</p>
      <p>{user.username} can view content without editing permissions.</p>
    </main>
  )
}
