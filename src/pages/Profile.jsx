import { useState } from 'react';
import { userService } from '../utils/storage';
import Navbar from '../components/Navbar';
import './Profile.css';

function Profile({ user, onLogout, settings }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.updateUser(user.id, formData);
    setEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-page">
      <Navbar user={user} onLogout={onLogout} settings={settings} />
      
      <div className="profile-content">
        <div className="container">
          <div className="profile-card card fade-in">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1>{user.name}</h1>
                <span className="badge badge-primary">{user.role}</span>
              </div>
            </div>

            {message && (
              <div className="success-banner">{message}</div>
            )}

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="input"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!editing}
                  placeholder="+1234567890"
                />
              </div>

              <div className="form-actions">
                {editing ? (
                  <>
                    <button type="submit" className="btn btn-success">
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone || ''
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>

            <div className="profile-info">
              <h3>Account Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>User ID:</strong>
                  <span>{user.id}</span>
                </div>
                <div className="info-item">
                  <strong>Role:</strong>
                  <span>{user.role}</span>
                </div>
                <div className="info-item">
                  <strong>Member Since:</strong>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
