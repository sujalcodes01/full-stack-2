import { useEffect, useState } from 'react';

const DEMO_USER = {
  username: 'admin',
  password: 'admin123',
};

function createMockJwt(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa(`mock-signature-${payload.sub}-${payload.role}`);
  return `${header}.${body}.${signature}`;
}

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

function readToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('jwt-demo-token');
}

function saveToken(token) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('jwt-demo-token', token);
}

function clearToken() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem('jwt-demo-token');
}

export default function App() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [token, setToken] = useState(() => readToken());
  const [message, setMessage] = useState('Use admin / admin123 to log in.');
  const [userInfo, setUserInfo] = useState(() => decodeJwt(readToken()));

  useEffect(() => {
    setUserInfo(decodeJwt(token));
  }, [token]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (form.username === DEMO_USER.username && form.password === DEMO_USER.password) {
      const payload = {
        sub: form.username,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      };

      const newToken = createMockJwt(payload);
      saveToken(newToken);
      setToken(newToken);
      setMessage('Login successful. Token stored in browser storage.');
    } else {
      setMessage('Invalid credentials. Try admin / admin123.');
    }
  };

  const handleLogout = () => {
    clearToken();
    setToken(null);
    setMessage('You have logged out.');
  };

  const simulateRequest = () => {
    if (!token) {
      setMessage('No active token. Please log in first.');
      return;
    }

    const authHeader = `Bearer ${token}`;
    setMessage(`Protected request sent with header: ${authHeader.slice(0, 40)}...`);
  };

  return (
    <div className="app-shell">
      <div className="card">
        <h1>JWT Authentication Demo</h1>
        <p className="intro">
          This example shows a mock JWT login flow, token storage, and protected request handling for a stateless session.
        </p>

        {!token ? (
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Username
              <input
                value={form.username}
                onChange={(event) => setForm({ ...form, username: event.target.value })}
                placeholder="admin"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="admin123"
              />
            </label>

            <button type="submit">Log In</button>
          </form>
        ) : (
          <div className="dashboard">
            <h2>Welcome back</h2>
            <p>You are authenticated with a JWT stored in local storage.</p>

            <div className="info-box">
              <strong>Decoded token payload</strong>
              <pre>{JSON.stringify(userInfo, null, 2)}</pre>
            </div>

            <div className="actions">
              <button onClick={simulateRequest}>Send protected request</button>
              <button className="secondary" onClick={handleLogout}>Log out</button>
            </div>
          </div>
        )}

        <div className="status-box">
          <strong>Status:</strong> {message}
        </div>
      </div>
    </div>
  );
}
