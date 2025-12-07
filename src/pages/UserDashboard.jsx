import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService, notificationService } from '../utils/storage';
import Navbar from '../components/Navbar';
import './UserDashboard.css';

function UserDashboard({ user, onLogout, settings }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allEvents = eventService.getAll();
    setEvents(allEvents.filter(e => e.status === 'active'));
    
    const userNotifications = notificationService.getUserNotifications(user.id);
    setNotifications(userNotifications.slice(0, 5));
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filter === 'upcoming') {
      return eventDate >= today;
    } else if (filter === 'past') {
      return eventDate < today;
    }
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} settings={settings} />
      
      <div className="dashboard-content">
        <div className="container">
          {/* Hero Section */}
          <div className="hero-section fade-in">
            <h1>{settings?.welcomeMessage || 'Welcome to Elite Club'}</h1>
            <p>{settings?.aboutText || 'Experience the finest entertainment'}</p>
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="notifications-section fade-in">
              <h2>📢 Notifications</h2>
              <div className="notifications-list">
                {notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    <div className="notification-content">
                      <strong>{notif.title}</strong>
                      <p>{notif.message}</p>
                    </div>
                    <span className="notification-time">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events Section */}
          <div className="events-section">
            <div className="section-header">
              <h2>🎉 Events</h2>
              <div className="filter-buttons">
                <button 
                  className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setFilter('all')}
                >
                  All Events
                </button>
                <button 
                  className={`btn ${filter === 'upcoming' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setFilter('upcoming')}
                >
                  Upcoming
                </button>
                <button 
                  className={`btn ${filter === 'past' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setFilter('past')}
                >
                  Past
                </button>
              </div>
            </div>

            <div className="events-grid grid grid-3">
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card card fade-in">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-badge">
                      {event.booked >= event.capacity ? (
                        <span className="badge badge-danger">Sold Out</span>
                      ) : event.booked >= event.capacity * 0.8 ? (
                        <span className="badge badge-warning">Almost Full</span>
                      ) : (
                        <span className="badge badge-success">Available</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-details">
                      <div className="detail-item">
                        <span className="icon">📅</span>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">🕐</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">💰</span>
                        <span>${event.price}</span>
                      </div>
                      <div className="detail-item">
                        <span className="icon">👥</span>
                        <span>{event.booked}/{event.capacity}</span>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary btn-block"
                      onClick={() => navigate(`/event/${event.id}`)}
                      disabled={!event.bookingEnabled || event.booked >= event.capacity}
                    >
                      {event.booked >= event.capacity ? 'Sold Out' : 
                       !event.bookingEnabled ? 'Booking Closed' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="empty-state">
                <p>No events found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
