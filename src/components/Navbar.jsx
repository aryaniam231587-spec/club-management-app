import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout, settings }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand" onClick={() => navigate('/')}>
            <img 
              src={settings?.clubLogo || 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=200'} 
              alt="Logo" 
              className="navbar-logo"
            />
            <span className="navbar-title">{settings?.clubName || 'Elite Club'}</span>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <button 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
            >
              🏠 Home
            </button>

            {user.role === 'user' && (
              <button 
                className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}
                onClick={() => {
                  navigate('/bookings');
                  setMobileMenuOpen(false);
                }}
              >
                🎫 My Bookings
              </button>
            )}

            <button 
              className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
              onClick={() => {
                navigate('/profile');
                setMobileMenuOpen(false);
              }}
            >
              👤 Profile
            </button>

            <div className="navbar-user">
              <span className="user-name">{user.name}</span>
              <span className="user-role badge badge-primary">{user.role}</span>
            </div>

            <button 
              className="btn btn-danger btn-sm"
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
