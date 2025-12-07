import { useState, useEffect } from 'react';
import { eventService, bookingService, userService, notificationService } from '../utils/storage';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';

function AdminDashboard({ user, onLogout, settings }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    price: '',
    capacity: '',
    image: '',
    bookingEnabled: true
  });
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    target: 'all'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setEvents(eventService.getAll());
    setBookings(bookingService.getAll());
    setUsers(userService.getAllUsers().filter(u => u.role === 'user'));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (editingEvent) {
      eventService.update(editingEvent.id, eventForm);
    } else {
      eventService.create(eventForm);
    }
    setShowEventModal(false);
    setEditingEvent(null);
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      price: '',
      capacity: '',
      image: '',
      bookingEnabled: true
    });
    loadData();
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      eventService.delete(eventId);
      loadData();
    }
  };

  const toggleBooking = (eventId, currentStatus) => {
    eventService.update(eventId, { bookingEnabled: !currentStatus });
    loadData();
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (notificationForm.target === 'all') {
      notificationService.create({
        userId: 'all',
        title: notificationForm.title,
        message: notificationForm.message
      });
    } else {
      users.forEach(u => {
        notificationService.create({
          userId: u.id,
          title: notificationForm.title,
          message: notificationForm.message
        });
      });
    }
    setShowNotificationModal(false);
    setNotificationForm({ title: '', message: '', target: 'all' });
    alert('Notification sent successfully!');
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status === 'confirmed' ? b.totalPrice : 0), 0);
  const upcomingBookings = bookings.filter(b => new Date(b.eventDate) >= new Date() && b.status === 'confirmed');

  return (
    <div className="admin-dashboard">
      <Navbar user={user} onLogout={onLogout} settings={settings} />
      
      <div className="admin-content">
        <div className="container">
          <div className="admin-header fade-in">
            <h1>Admin Dashboard</h1>
            <div className="admin-actions">
              <button className="btn btn-primary" onClick={() => setShowEventModal(true)}>
                + Create Event
              </button>
              <button className="btn btn-secondary" onClick={() => setShowNotificationModal(true)}>
                📢 Send Notification
              </button>
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
              className={`tab ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button 
              className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
            <button 
              className={`tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content fade-in">
              <div className="stats-grid grid grid-4">
                <div className="stat-card card">
                  <div className="stat-icon">🎉</div>
                  <div className="stat-value">{events.length}</div>
                  <div className="stat-label">Total Events</div>
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

              <div className="recent-section">
                <h2>Recent Bookings</h2>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>User</th>
                        <th>Tickets</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingBookings.slice(0, 5).map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.eventTitle}</td>
                          <td>{users.find(u => u.id === booking.userId)?.name || 'Unknown'}</td>
                          <td>{booking.quantity}</td>
                          <td>${booking.totalPrice}</td>
                          <td><span className="badge badge-success">{booking.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="tab-content fade-in">
              <div className="events-list">
                {events.map(event => (
                  <div key={event.id} className="event-item card">
                    <img src={event.image} alt={event.title} className="event-thumb" />
                    <div className="event-info-admin">
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <div className="event-meta-admin">
                        <span>📅 {event.date}</span>
                        <span>🕐 {event.time}</span>
                        <span>💰 ${event.price}</span>
                        <span>👥 {event.booked}/{event.capacity}</span>
                      </div>
                    </div>
                    <div className="event-actions-admin">
                      <button 
                        className={`btn ${event.bookingEnabled ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => toggleBooking(event.id, event.bookingEnabled)}
                      >
                        {event.bookingEnabled ? 'Booking On' : 'Booking Off'}
                      </button>
                      <button className="btn btn-primary" onClick={() => handleEditEvent(event)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDeleteEvent(event.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="tab-content fade-in">
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Event</th>
                      <th>User</th>
                      <th>Date</th>
                      <th>Tickets</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.eventTitle}</td>
                        <td>{users.find(u => u.id === booking.userId)?.name || 'Unknown'}</td>
                        <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                        <td>{booking.quantity}</td>
                        <td>${booking.totalPrice}</td>
                        <td><span className="badge badge-success">{booking.paymentStatus}</span></td>
                        <td><span className={`badge badge-${booking.status === 'confirmed' ? 'success' : 'danger'}`}>{booking.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="tab-content fade-in">
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone || 'N/A'}</td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="input"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="input"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  rows="3"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    className="input"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    className="input"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    className="input"
                    value={eventForm.price}
                    onChange={(e) => setEventForm({...eventForm, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    className="input"
                    value={eventForm.capacity}
                    onChange={(e) => setEventForm({...eventForm, capacity: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  className="input"
                  value={eventForm.image}
                  onChange={(e) => setEventForm({...eventForm, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={eventForm.bookingEnabled}
                    onChange={(e) => setEventForm({...eventForm, bookingEnabled: e.target.checked})}
                  />
                  {' '}Enable Booking
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowEventModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? 'Update' : 'Create'} Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="modal-overlay" onClick={() => setShowNotificationModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Send Notification</h2>
            <form onSubmit={handleSendNotification}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="input"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="input"
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Target</label>
                <select
                  className="input"
                  value={notificationForm.target}
                  onChange={(e) => setNotificationForm({...notificationForm, target: e.target.value})}
                >
                  <option value="all">All Users</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowNotificationModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
