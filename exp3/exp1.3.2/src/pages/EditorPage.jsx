import { useAuth } from '../auth/AuthContext'

export default function EditorPage() {
  const { user } = useAuth()

  return (
    <main>
      <h1>Editor Page</h1>
      <p>Editors and Admins can access this page.</p>
      <p>{user.username} can edit content and approve changes.</p>
    </main>
  )
}
