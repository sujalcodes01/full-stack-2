import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const result = auth.login(username, password)

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign in</button>
      </form>
      <p>Try: admin/admin123, editor/editor123, viewer/viewer123</p>
    </main>
  )
}
