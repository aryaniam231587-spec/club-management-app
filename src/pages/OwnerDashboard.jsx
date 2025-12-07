import { useState, useEffect } from 'react';
import { eventService, bookingService, userService, settingsService } from '../utils/storage';
import Navbar from '../components/Navbar';
import './OwnerDashboard.css';

function OwnerDashboard({ user, onLogout, settings, onSettingsUpdate }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [settingsForm, setSettingsForm] = useState({
    clubName: settings?.clubName || '',
    clubLogo: settings?.clubLogo || '',
    welcomeMessage: settings?.welcomeMessage || '',
    aboutText: settings?.aboutText || '',
    maintenanceMode: settings?.maintenanceMode || false,
    maintenanceMessage: settings?.maintenanceMessage || ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setEvents(eventService.getAll());
    setBookings(bookingService.getAll());
    const allUsers = userService.getAllUsers();
    setUsers(allUsers.filter(u => u.role === 'user'));
    setAdmins(allUsers.filter(u => u.role === 'admin'));
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    userService.addAdmin(adminForm);
    setShowAdminModal(false);
    setAdminForm({ name: '', email: '', password: '', phone: '' });
    loadData();
  };

  const handleRemoveAdmin = (adminId) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      userService.removeAdmin(adminId);
      loadData();
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const newSettings = settingsService.update(settingsForm);
    onSettingsUpdate(newSettings);
    alert('Settings updated successfully!');
  };

  const toggleMaintenance = () => {
    const newMode = !settingsForm.maintenanceMode;
    setSettingsForm({...settingsForm, maintenanceMode: newMode});
    const newSettings = settingsService.update({...settingsForm, maintenanceMode: newMode});
    onSettingsUpdate(newSettings);
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status === 'confirmed' ? b.totalPrice : 0), 0);
  const activeEvents = events.filter(e => e.status === 'active').length;

  return (
    <div className="owner-dashboard">
      <Navbar user={user} onLogout={onLogout} settings={settings} />
      
      <div className="owner-content">
        <div className="container">
          <div className="owner-header fade-in">
            <h1>Owner Dashboard</h1>
            <div className="maintenance-toggle">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settingsForm.maintenanceMode}
                  onChange={toggleMaintenance}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">
                {settingsForm.maintenanceMode ? '🔧 Maintenance Mode ON' : '✅ Site Active'}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs fade-in">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'customization' ? 'active' : ''}`}
              onClick={() => setActiveTab('customization')}
            >
              Customization
            </button>
            <button 
              className={`tab ${activeTab === 'admins' ? 'active' : ''}`}
              onClick={() => setActiveTab('admins')}
            >
              Admins
            </button>
            <button 
              className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
              <div className="stats-grid grid grid-4">
                <div className="stat-card card">
                  <div className="stat-icon">🎉</div>
                  <div className="stat-value">{activeEvents}</div>
                  <div className="stat-label">Active Events</div>
                </div>
                <div className="stat-card card">
                  <div className="stat-icon">🎫</div>
                  <div className="stat-value">{bookings.length}</div>
                  <div className="stat-label">Total Bookings</div>
                </div>
                <div className="stat-card card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-value">{users.length}</div>
                  <div className="stat-label">Total Users</div>
                </div>
                <div className="stat-card card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-value">${totalRevenue}</div>
                  <div className="stat-label">Total Revenue</div>
                </div>
              </div>

              <div className="overview-grid grid grid-2">
                <div className="card">
                  <h3>System Status</h3>
                  <div className="status-list">
                    <div className="status-item">
                      <span>Website Status:</span>
                      <span className={`badge ${settingsForm.maintenanceMode ? 'badge-warning' : 'badge-success'}`}>
                        {settingsForm.maintenanceMode ? 'Maintenance' : 'Active'}
                      </span>
                    </div>
                    <div className="status-item">
                      <span>Total Events:</span>
                      <strong>{events.length}</strong>
                    </div>
                    <div className="status-item">
                      <span>Active Admins:</span>
                      <strong>{admins.length}</strong>
                    </div>
                    <div className="status-item">
                      <span>Registered Users:</span>
                      <strong>{users.length}</strong>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions">
                    <button className="btn btn-primary btn-block" onClick={() => setActiveTab('customization')}>
                      🎨 Customize Appearance
                    </button>
                    <button className="btn btn-secondary btn-block" onClick={() => setActiveTab('admins')}>
                      👨‍💼 Manage Admins
                    </button>
                    <button className="btn btn-outline btn-block" onClick={() => setActiveTab('analytics')}>
                      📊 View Analytics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customization Tab */}
          {activeTab === 'customization' && (
            <div className="tab-content fade-in">
              <div className="customization-section">
                <form onSubmit={handleSaveSettings} className="settings-form">
                  <div className="card">
                    <h3>Branding</h3>
                    <div className="form-group">
                      <label>Club Name</label>
                      <input
                        type="text"
                        className="input"
                        value={settingsForm.clubName}
                        onChange={(e) => setSettingsForm({...settingsForm, clubName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Club Logo URL</label>
                      <input
                        type="url"
                        className="input"
                        value={settingsForm.clubLogo}
                        onChange={(e) => setSettingsForm({...settingsForm, clubLogo: e.target.value})}
                        placeholder="https://example.com/logo.png"
                      />
                      {settingsForm.clubLogo && (
                        <div className="logo-preview">
                          <img src={settingsForm.clubLogo} alt="Logo Preview" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card">
                    <h3>Content</h3>
                    <div className="form-group">
                      <label>Welcome Message</label>
                      <input
                        type="text"
                        className="input"
                        value={settingsForm.welcomeMessage}
                        onChange={(e) => setSettingsForm({...settingsForm, welcomeMessage: e.target.value})}
                        placeholder="Welcome to our club!"
                      />
                    </div>
                    <div className="form-group">
                      <label>About Text</label>
                      <textarea
                        className="input"
                        value={settingsForm.aboutText}
                        onChange={(e) => setSettingsForm({...settingsForm, aboutText: e.target.value})}
                        rows="3"
                        placeholder="Tell visitors about your club..."
                      />
                    </div>
                  </div>

                  <div className="card">
                    <h3>Maintenance Mode</h3>
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={settingsForm.maintenanceMode}
                          onChange={(e) => setSettingsForm({...settingsForm, maintenanceMode: e.target.checked})}
                        />
                        {' '}Enable Maintenance Mode
                      </label>
                    </div>
                    {settingsForm.maintenanceMode && (
                      <div className="form-group">
                        <label>Maintenance Message</label>
                        <textarea
                          className="input"
                          value={settingsForm.maintenanceMessage}
                          onChange={(e) => setSettingsForm({...settingsForm, maintenanceMessage: e.target.value})}
                          rows="3"
                          placeholder="We'll be back soon!"
                        />
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-success btn-lg">
                    Save All Settings
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Admins Tab */}
          {activeTab === 'admins' && (
            <div className="tab-content fade-in">
              <div className="admins-header">
                <h2>Admin Management</h2>
                <button className="btn btn-primary" onClick={() => setShowAdminModal(true)}>
                  + Add Admin
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map(admin => (
                      <tr key={admin.id}>
                        <td>{admin.id}</td>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.phone || 'N/A'}</td>
                        <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveAdmin(admin.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="tab-content fade-in">
              <div className="analytics-grid grid grid-2">
                <div className="card">
                  <h3>Revenue Breakdown</h3>
                  <div className="analytics-item">
                    <span>Total Revenue:</span>
                    <strong className="revenue-value">${totalRevenue}</strong>
                  </div>
                  <div className="analytics-item">
                    <span>Average per Booking:</span>
                    <strong>${bookings.length > 0 ? (totalRevenue / bookings.length).toFixed(2) : 0}</strong>
                  </div>
                  <div className="analytics-item">
                    <span>Total Bookings:</span>
                    <strong>{bookings.length}</strong>
                  </div>
                </div>

                <div className="card">
                  <h3>Event Statistics</h3>
                  <div className="analytics-item">
                    <span>Total Events:</span>
                    <strong>{events.length}</strong>
                  </div>
                  <div className="analytics-item">
                    <span>Active Events:</span>
                    <strong>{activeEvents}</strong>
                  </div>
                  <div className="analytics-item">
                    <span>Average Capacity:</span>
                    <strong>{events.length > 0 ? Math.round(events.reduce((sum, e) => sum + e.capacity, 0) / events.length) : 0}</strong>
                  </div>
                </div>

                <div className="card">
                  <h3>User Statistics</h3>
                  <div className="analytics-item">
                    <span>Total Users:</span>
                    <strong>{users.length}</strong>
                  </div>
                  <div className="analytics-item">
                    <span>Total Admins:</span>
                    <strong>{admins.length}</strong>
                  </div>
                  <div className="analytics-item">
                    <span>Bookings per User:</span>
                    <strong>{users.length > 0 ? (bookings.length / users.length).toFixed(2) : 0}</strong>
                  </div>
                </div>

                <div className="card">
                  <h3>Top Events</h3>
                  {events
                    .sort((a, b) => b.booked - a.booked)
                    .slice(0, 3)
                    .map((event, index) => (
                      <div key={event.id} className="analytics-item">
                        <span>{index + 1}. {event.title}</span>
                        <strong>{event.booked} bookings</strong>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAdminModal && (
        <div className="modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Admin</h2>
            <form onSubmit={handleAddAdmin}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="input"
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({...adminForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="input"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({...adminForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="input"
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="input"
                  value={adminForm.phone}
                  onChange={(e) => setAdminForm({...adminForm, phone: e.target.value})}
                  placeholder="+1234567890"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAdminModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
