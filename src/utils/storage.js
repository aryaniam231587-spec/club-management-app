// Local Storage Management
const STORAGE_KEYS = {
  USERS: 'club_users',
  EVENTS: 'club_events',
  BOOKINGS: 'club_bookings',
  SETTINGS: 'club_settings',
  NOTIFICATIONS: 'club_notifications',
  CURRENT_USER: 'club_current_user'
};

// Initialize default data
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: '1',
        email: 'owner@club.com',
        password: 'owner123',
        role: 'owner',
        name: 'Club Owner',
        phone: '+1234567890',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'admin@club.com',
        password: 'admin123',
        role: 'admin',
        name: 'Club Admin',
        phone: '+1234567891',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'user@club.com',
        password: 'user123',
        role: 'user',
        name: 'John Doe',
        phone: '+1234567892',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    const defaultEvents = [
      {
        id: '1',
        title: 'Friday Night Party',
        description: 'Join us for an amazing night of music and dancing',
        date: '2025-12-15',
        time: '21:00',
        price: 50,
        capacity: 200,
        booked: 45,
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
        status: 'active',
        bookingEnabled: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Saturday Live Music',
        description: 'Experience live performances from top artists',
        date: '2025-12-16',
        time: '20:00',
        price: 75,
        capacity: 150,
        booked: 89,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        status: 'active',
        bookingEnabled: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Sunday Brunch Special',
        description: 'Relax with friends over delicious food and drinks',
        date: '2025-12-17',
        time: '12:00',
        price: 35,
        capacity: 100,
        booked: 23,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        status: 'active',
        bookingEnabled: true,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(defaultEvents));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    const defaultSettings = {
      clubName: 'Elite Club',
      clubLogo: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=200',
      theme: {
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6'
      },
      maintenanceMode: false,
      maintenanceMessage: 'We are currently under maintenance. Please check back soon!',
      welcomeMessage: 'Welcome to Elite Club - Where Memories Are Made',
      aboutText: 'Experience the finest entertainment and hospitality in the city.'
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
  }
};

// Storage operations
export const storage = {
  init: initializeData,
  
  get: (key) => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS[key]);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to storage:', error);
      return false;
    }
  },

  clear: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// User operations
export const userService = {
  login: (email, password) => {
    const users = storage.get('USERS') || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      storage.set('CURRENT_USER', userWithoutPassword);
      return userWithoutPassword;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: () => {
    return storage.get('CURRENT_USER');
  },

  getAllUsers: () => {
    return storage.get('USERS') || [];
  },

  updateUser: (userId, updates) => {
    const users = storage.get('USERS') || [];
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      storage.set('USERS', users);
      
      const currentUser = storage.get('CURRENT_USER');
      if (currentUser && currentUser.id === userId) {
        storage.set('CURRENT_USER', { ...currentUser, ...updates });
      }
      return true;
    }
    return false;
  },

  addAdmin: (adminData) => {
    const users = storage.get('USERS') || [];
    const newAdmin = {
      id: Date.now().toString(),
      ...adminData,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    users.push(newAdmin);
    storage.set('USERS', users);
    return newAdmin;
  },

  removeAdmin: (adminId) => {
    const users = storage.get('USERS') || [];
    const filtered = users.filter(u => u.id !== adminId);
    storage.set('USERS', filtered);
    return true;
  }
};

// Event operations
export const eventService = {
  getAll: () => {
    return storage.get('EVENTS') || [];
  },

  getById: (id) => {
    const events = storage.get('EVENTS') || [];
    return events.find(e => e.id === id);
  },

  create: (eventData) => {
    const events = storage.get('EVENTS') || [];
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      booked: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    events.push(newEvent);
    storage.set('EVENTS', events);
    return newEvent;
  },

  update: (id, updates) => {
    const events = storage.get('EVENTS') || [];
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...updates };
      storage.set('EVENTS', events);
      return events[index];
    }
    return null;
  },

  delete: (id) => {
    const events = storage.get('EVENTS') || [];
    const filtered = events.filter(e => e.id !== id);
    storage.set('EVENTS', filtered);
    return true;
  }
};

// Booking operations
export const bookingService = {
  getAll: () => {
    return storage.get('BOOKINGS') || [];
  },

  getUserBookings: (userId) => {
    const bookings = storage.get('BOOKINGS') || [];
    return bookings.filter(b => b.userId === userId);
  },

  create: (bookingData) => {
    const bookings = storage.get('BOOKINGS') || [];
    const events = storage.get('EVENTS') || [];
    
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    storage.set('BOOKINGS', bookings);
    
    // Update event booked count
    const eventIndex = events.findIndex(e => e.id === bookingData.eventId);
    if (eventIndex !== -1) {
      events[eventIndex].booked += bookingData.quantity;
      storage.set('EVENTS', events);
    }
    
    return newBooking;
  },

  cancel: (bookingId) => {
    const bookings = storage.get('BOOKINGS') || [];
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      bookings[index].status = 'cancelled';
      storage.set('BOOKINGS', bookings);
      return true;
    }
    return false;
  }
};

// Settings operations
export const settingsService = {
  get: () => {
    return storage.get('SETTINGS');
  },

  update: (updates) => {
    const settings = storage.get('SETTINGS') || {};
    const newSettings = { ...settings, ...updates };
    storage.set('SETTINGS', newSettings);
    return newSettings;
  }
};

// Notification operations
export const notificationService = {
  getAll: () => {
    return storage.get('NOTIFICATIONS') || [];
  },

  getUserNotifications: (userId) => {
    const notifications = storage.get('NOTIFICATIONS') || [];
    return notifications.filter(n => n.userId === userId || n.userId === 'all');
  },

  create: (notificationData) => {
    const notifications = storage.get('NOTIFICATIONS') || [];
    const newNotification = {
      id: Date.now().toString(),
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString()
    };
    notifications.push(newNotification);
    storage.set('NOTIFICATIONS', notifications);
    return newNotification;
  },

  markAsRead: (notificationId) => {
    const notifications = storage.get('NOTIFICATIONS') || [];
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      storage.set('NOTIFICATIONS', notifications);
      return true;
    }
    return false;
  }
};
