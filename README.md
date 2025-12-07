# 🎉 Club Management System

A complete, full-featured club management application with three distinct user roles: **Owner**, **Admin**, and **User**. Built with React and featuring a clean, modern UI with real-time functionality.

## 🚀 Live Demo

**Live Application:** [https://aryaniam231587-spec.github.io/club-management-app/](https://aryaniam231587-spec.github.io/club-management-app/)

## 🔑 Demo Accounts

### Owner Account
- **Email:** `owner@club.com`
- **Password:** `owner123`
- **Access:** Full control over everything

### Admin Account
- **Email:** `admin@club.com`
- **Password:** `admin123`
- **Access:** Event and booking management

### User Account
- **Email:** `user@club.com`
- **Password:** `user123`
- **Access:** Browse and book events

## ✨ Features

### 🎯 Role-Based Access Control

#### 1️⃣ Owner (Super Admin)
- **Full System Control**
  - Complete customization of app layout, theme, and branding
  - Change club name, logo, welcome message, and about text
  - Enable/disable maintenance mode with custom messages
  - Real-time maintenance mode toggle
  
- **Admin Management**
  - Add new admins with full credentials
  - Remove existing admins
  - View all admin accounts and activity
  
- **Advanced Analytics**
  - Revenue breakdown and statistics
  - Event performance metrics
  - User engagement analytics
  - Top performing events tracking
  
- **Complete Oversight**
  - View all events, bookings, and users
  - Access to all admin features
  - System-wide statistics dashboard

#### 2️⃣ Admin
- **Event Management**
  - Create new events with full details
  - Edit existing events (title, description, date, time, price, capacity, image)
  - Delete events
  - Toggle booking on/off for specific events
  - Set event prices and capacity limits
  
- **Booking Management**
  - View all bookings across all events
  - See payment status and booking details
  - Track upcoming and past bookings
  - Monitor booking statistics
  
- **User Management**
  - View complete user list
  - Access user statistics and information
  - Track user activity
  
- **Notification System**
  - Send in-app notifications to all users
  - Create custom notification messages
  - Broadcast important announcements

#### 3️⃣ User
- **Event Discovery**
  - Browse all available events
  - Filter events (All, Upcoming, Past)
  - View detailed event information
  - See real-time availability status
  
- **Booking System**
  - Book events with quantity selection
  - Dummy payment system for demo
  - Instant booking confirmation
  - View booking history
  
- **Personal Dashboard**
  - View upcoming bookings
  - Access past booking history
  - Cancel bookings
  - Receive notifications from admins
  
- **Profile Management**
  - Edit personal information
  - Update contact details
  - View account information

## 🎨 Core Features

### ✅ Working Features
- ✅ **Role-based authentication** with secure login
- ✅ **Event listing** with beautiful card layouts
- ✅ **Event detail pages** with full information
- ✅ **Booking system** with dummy payment
- ✅ **Admin dashboard** with comprehensive controls
- ✅ **Owner dashboard** with full customization
- ✅ **Notification system** (in-app)
- ✅ **Maintenance mode** controlled by owner
- ✅ **Mobile responsive design**
- ✅ **Smooth animations** and transitions
- ✅ **Local storage database** for demo persistence

### 🎯 User Experience
- **Clean, Modern UI** - Professional design with smooth animations
- **Intuitive Navigation** - Easy-to-use interface for all roles
- **Real-time Updates** - Instant feedback on all actions
- **Mobile Responsive** - Works perfectly on all devices
- **Fast Performance** - Optimized for speed and efficiency

## 🛠️ Technology Stack

- **Frontend:** React 18 with Hooks
- **Routing:** React Router v6
- **Styling:** Custom CSS with CSS Variables
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Storage:** LocalStorage (for demo)
- **Deployment:** GitHub Pages

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/aryaniam231587-spec/club-management-app.git
cd club-management-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## 📱 Application Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation component
│   └── Navbar.css
├── pages/
│   ├── Login.jsx           # Login page
│   ├── UserDashboard.jsx   # User dashboard
│   ├── AdminDashboard.jsx  # Admin dashboard
│   ├── OwnerDashboard.jsx  # Owner dashboard
│   ├── EventDetails.jsx    # Event detail page
│   ├── BookingHistory.jsx  # Booking history
│   ├── Profile.jsx         # User profile
│   ├── MaintenancePage.jsx # Maintenance mode page
│   └── [corresponding CSS files]
├── utils/
│   └── storage.js          # Data management & services
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🎮 How to Use

### For Testing All Roles:

1. **Visit the live demo** or run locally
2. **Use quick login buttons** on the login page
3. **Explore each role:**
   - Start with **User** to see the customer experience
   - Login as **Admin** to manage events and bookings
   - Login as **Owner** to access full customization

### Owner Workflow:
1. Login with owner credentials
2. Toggle maintenance mode from the header
3. Go to "Customization" tab to change branding
4. Go to "Admins" tab to add/remove admins
5. View analytics in the "Analytics" tab

### Admin Workflow:
1. Login with admin credentials
2. Click "Create Event" to add new events
3. Manage existing events (edit, delete, toggle booking)
4. View all bookings in the "Bookings" tab
5. Send notifications to users

### User Workflow:
1. Login with user credentials
2. Browse available events
3. Click on an event to view details
4. Book tickets with quantity selection
5. View bookings in "My Bookings"

## 🔒 Data Persistence

The application uses **LocalStorage** for data persistence in the demo. This means:
- ✅ Data persists across page refreshes
- ✅ Changes are saved immediately
- ✅ Works offline
- ⚠️ Data is browser-specific
- ⚠️ Clearing browser data will reset the app

To reset to default data, clear your browser's LocalStorage for the site.

## 🎨 Customization

### Owner Can Customize:
- Club name and logo
- Welcome message
- About text
- Maintenance mode and message
- All visual branding elements

### Admin Can Customize:
- Event details and images
- Booking availability
- Event pricing and capacity
- Notification content

## 📊 Features Breakdown

| Feature | Owner | Admin | User |
|---------|-------|-------|------|
| View Events | ✅ | ✅ | ✅ |
| Create Events | ✅ | ✅ | ❌ |
| Edit Events | ✅ | ✅ | ❌ |
| Delete Events | ✅ | ✅ | ❌ |
| Book Events | ❌ | ❌ | ✅ |
| View All Bookings | ✅ | ✅ | Own Only |
| Manage Admins | ✅ | ❌ | ❌ |
| Customize App | ✅ | ❌ | ❌ |
| Maintenance Mode | ✅ | ❌ | ❌ |
| Send Notifications | ✅ | ✅ | ❌ |
| View Analytics | ✅ | Partial | ❌ |

## 🚀 Deployment

The application is deployed on **GitHub Pages** and is accessible at:
**https://aryaniam231587-spec.github.io/club-management-app/**

### Deploy Your Own:

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch
4. The app will be live at `https://[your-username].github.io/club-management-app/`

## 🐛 Known Limitations

- Uses LocalStorage (not a real database)
- Dummy payment system (no real transactions)
- In-app notifications only (no email/SMS)
- Single-browser data persistence
- No real-time multi-user sync

## 🔮 Future Enhancements

- Real backend with database
- Real payment integration
- Email/SMS notifications
- Multi-user real-time sync
- Advanced analytics dashboard
- Export data functionality
- Image upload for events
- Calendar integration

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Developer

Created by **Bhindi AI** for demonstration purposes.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing-fast build tool
- Unsplash for demo images
- Lucide for beautiful icons

---

**Enjoy exploring the Club Management System! 🎉**

For questions or issues, please open an issue on GitHub.
