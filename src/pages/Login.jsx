import { useState } from 'react';
import { userService } from '../utils/storage';
import './Login.css';

function Login({ onLogin, settings }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = userService.login(email, password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  const quickLogin = (role) => {
    const credentials = {
      owner: { email: 'owner@club.com', password: 'owner123' },
      admin: { email: 'admin@club.com', password: 'admin123' },
      user: { email: 'user@club.com', password: 'user123' }
    };

    const cred = credentials[role];
    const user = userService.login(cred.email, cred.password);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container fade-in">
        <div className="login-header">
          <img 
            src={settings?.clubLogo || 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=200'} 
            alt="Club Logo" 
            className="club-logo"
          />
          <h1>{settings?.clubName || 'Elite Club'}</h1>
          <p>Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>

        {showDemo && (
          <div className="demo-accounts">
            <div className="demo-header">
              <h3>Demo Accounts</h3>
              <button 
                className="close-demo"
                onClick={() => setShowDemo(false)}
              >
                ×
              </button>
            </div>
            <p>Quick login for testing:</p>
            <div className="demo-buttons">
              <button 
                className="btn btn-outline"
                onClick={() => quickLogin('owner')}
              >
                Login as Owner
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => quickLogin('admin')}
              >
                Login as Admin
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => quickLogin('user')}
              >
                Login as User
              </button>
            </div>
            <div className="demo-credentials">
              <p><strong>Owner:</strong> owner@club.com / owner123</p>
              <p><strong>Admin:</strong> admin@club.com / admin123</p>
              <p><strong>User:</strong> user@club.com / user123</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
