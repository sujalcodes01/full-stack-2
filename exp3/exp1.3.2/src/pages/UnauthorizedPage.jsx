import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
  return (
    <main>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/dashboard">Back to Dashboard</Link>
    </main>
  )
}
