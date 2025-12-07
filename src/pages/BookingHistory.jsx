import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../utils/storage';
import Navbar from '../components/Navbar';
import './BookingHistory.css';

function BookingHistory({ user, onLogout, settings }) {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const userBookings = bookingService.getUserBookings(user.id);
    setBookings(userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      bookingService.cancel(bookingId);
      loadBookings();
    }
  };

  const upcomingBookings = bookings.filter(b => 
    new Date(b.eventDate) >= new Date() && b.status === 'confirmed'
  );

  const pastBookings = bookings.filter(b => 
    new Date(b.eventDate) < new Date() || b.status === 'cancelled'
  );

  return (
    <div className="booking-history-page">
      <Navbar user={user} onLogout={onLogout} settings={settings} />
      
      <div className="booking-history-content">
        <div className="container">
          <h1 className="page-title fade-in">My Bookings</h1>

          {/* Upcoming Bookings */}
          <div className="bookings-section fade-in">
            <h2>🎫 Upcoming Events</h2>
            {upcomingBookings.length > 0 ? (
              <div className="bookings-list">
                {upcomingBookings.map(booking => (
                  <div key={booking.id} className="booking-card card">
                    <div className="booking-header">
                      <div>
                        <h3>{booking.eventTitle}</h3>
                        <span className="badge badge-success">Confirmed</span>
                      </div>
                      <div className="booking-price">${booking.totalPrice}</div>
                    </div>
                    
                    <div className="booking-details">
                      <div className="detail">
                        <span className="icon">📅</span>
                        <span>{new Date(booking.eventDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="detail">
                        <span className="icon">🕐</span>
                        <span>{booking.eventTime}</span>
                      </div>
                      <div className="detail">
                        <span className="icon">🎟️</span>
                        <span>{booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}</span>
                      </div>
                      <div className="detail">
                        <span className="icon">💳</span>
                        <span className="badge badge-success">{booking.paymentStatus}</span>
                      </div>
                    </div>

                    <div className="booking-actions">
                      <button 
                        className="btn btn-outline"
                        onClick={() => navigate(`/event/${booking.eventId}`)}
                      >
                        View Event
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No upcoming bookings</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/')}
                >
                  Browse Events
                </button>
              </div>
            )}
          </div>

          {/* Past Bookings */}
          {pastBookings.length > 0 && (
            <div className="bookings-section fade-in">
              <h2>📜 Past Bookings</h2>
              <div className="bookings-list">
                {pastBookings.map(booking => (
                  <div key={booking.id} className="booking-card card past">
                    <div className="booking-header">
                      <div>
                        <h3>{booking.eventTitle}</h3>
                        <span className={`badge ${booking.status === 'cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="booking-price">${booking.totalPrice}</div>
                    </div>
                    
                    <div className="booking-details">
                      <div className="detail">
                        <span className="icon">📅</span>
                        <span>{new Date(booking.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className="detail">
                        <span className="icon">🎟️</span>
                        <span>{booking.quantity} ticket{booking.quantity > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
