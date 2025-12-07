import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService, bookingService } from '../utils/storage';
import Navbar from '../components/Navbar';
import './EventDetails.css';

function EventDetails({ user, onLogout, settings }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const eventData = eventService.getById(id);
    if (eventData) {
      setEvent(eventData);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleBooking = () => {
    if (!event || quantity < 1) return;

    const totalPrice = event.price * quantity;
    const booking = {
      userId: user.id,
      eventId: event.id,
      eventTitle: event.title,
      quantity,
      totalPrice,
      eventDate: event.date,
      eventTime: event.time
    };

    bookingService.create(booking);
    setBookingSuccess(true);
    
    // Reload event data
    const updatedEvent = eventService.getById(id);
    setEvent(updatedEvent);

    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSuccess(false);
      navigate('/bookings');
    }, 2000);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const availableSpots = event.capacity - event.booked;
  const isSoldOut = availableSpots <= 0;
  const isAlmostFull = availableSpots <= event.capacity * 0.2;

  return (
    <div className="event-details-page">
      <Navbar user={user} onLogout={onLogout} settings={settings} />
      
      <div className="event-details-content">
        <div className="container">
          <button className="btn btn-outline back-btn" onClick={() => navigate('/')}>
            ← Back to Events
          </button>

          <div className="event-details-card fade-in">
            <div className="event-hero">
              <img src={event.image} alt={event.title} />
              <div className="event-status-badge">
                {isSoldOut ? (
                  <span className="badge badge-danger">Sold Out</span>
                ) : isAlmostFull ? (
                  <span className="badge badge-warning">Almost Full</span>
                ) : (
                  <span className="badge badge-success">Available</span>
                )}
              </div>
            </div>

            <div className="event-info">
              <h1>{event.title}</h1>
              <p className="event-desc">{event.description}</p>

              <div className="event-meta">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <div>
                    <strong>Date</strong>
                    <p>{new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-icon">🕐</span>
                  <div>
                    <strong>Time</strong>
                    <p>{event.time}</p>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-icon">💰</span>
                  <div>
                    <strong>Price</strong>
                    <p>${event.price} per ticket</p>
                  </div>
                </div>

                <div className="meta-item">
                  <span className="meta-icon">👥</span>
                  <div>
                    <strong>Availability</strong>
                    <p>{availableSpots} of {event.capacity} spots left</p>
                  </div>
                </div>
              </div>

              {user.role === 'user' && event.bookingEnabled && !isSoldOut && (
                <div className="booking-section">
                  <h3>Book Your Spot</h3>
                  <div className="quantity-selector">
                    <label>Number of Tickets:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="btn btn-outline"
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, Math.min(availableSpots, parseInt(e.target.value) || 1)))}
                        className="quantity-input"
                        min="1"
                        max={availableSpots}
                      />
                      <button 
                        onClick={() => setQuantity(Math.min(availableSpots, quantity + 1))}
                        className="btn btn-outline"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="total-price">
                    <span>Total:</span>
                    <strong>${event.price * quantity}</strong>
                  </div>

                  <button 
                    className="btn btn-primary btn-block btn-lg"
                    onClick={() => setShowBookingModal(true)}
                  >
                    Book Now
                  </button>
                </div>
              )}

              {!event.bookingEnabled && (
                <div className="booking-disabled">
                  <p>Booking is currently closed for this event</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => !bookingSuccess && setShowBookingModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {bookingSuccess ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Booking Confirmed!</h2>
                <p>Your tickets have been booked successfully</p>
                <p>Redirecting to your bookings...</p>
              </div>
            ) : (
              <>
                <h2>Confirm Booking</h2>
                <div className="modal-content">
                  <p><strong>Event:</strong> {event.title}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Tickets:</strong> {quantity}</p>
                  <p><strong>Total:</strong> ${event.price * quantity}</p>
                </div>
                <div className="modal-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-success"
                    onClick={handleBooking}
                  >
                    Confirm & Pay
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
