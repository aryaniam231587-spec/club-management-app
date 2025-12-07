# 🚀 Quick Setup Guide

## Instant Demo Access

**Live Demo:** [https://aryaniam231587-spec.github.io/club-management-app/](https://aryaniam231587-spec.github.io/club-management-app/)

Just click the link above and use the demo accounts to explore!

## Demo Credentials

### 👑 Owner Login
```
Email: owner@club.com
Password: owner123
```
**What you can do:**
- Customize the entire app (name, logo, colors, messages)
- Enable/disable maintenance mode
- Add and remove admins
- View complete analytics
- Full access to all features

### 👨‍💼 Admin Login
```
Email: admin@club.com
Password: admin123
```
**What you can do:**
- Create, edit, and delete events
- Manage all bookings
- View user statistics
- Send notifications to users
- Toggle booking on/off for events

### 👤 User Login
```
Email: user@club.com
Password: user123
```
**What you can do:**
- Browse all events
- Book tickets for events
- View booking history
- Receive notifications
- Edit your profile

## 🎯 Quick Test Workflow

### Test as User (5 minutes)
1. Login with user credentials
2. Browse the events on the homepage
3. Click on any event to see details
4. Book tickets (select quantity)
5. Confirm booking (dummy payment)
6. Go to "My Bookings" to see your booking
7. Try canceling a booking

### Test as Admin (5 minutes)
1. Logout and login with admin credentials
2. Click "Create Event" button
3. Fill in event details and create
4. Go to "Events" tab to see all events
5. Edit or delete an event
6. Toggle booking on/off
7. Go to "Bookings" tab to see all bookings
8. Click "Send Notification" to notify users

### Test as Owner (5 minutes)
1. Logout and login with owner credentials
2. Toggle maintenance mode from the header
3. Go to "Customization" tab
4. Change club name and welcome message
5. Save settings and see changes
6. Go to "Admins" tab
7. Add a new admin
8. View analytics in "Analytics" tab

## 🏃‍♂️ Run Locally

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Steps

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

4. **Open browser**
```
http://localhost:5173
```

That's it! The app will run with all demo data pre-loaded.

## 🔄 Reset Demo Data

If you want to reset all data to defaults:

1. Open browser console (F12)
2. Go to Application/Storage tab
3. Find LocalStorage
4. Delete all items for the site
5. Refresh the page

The app will reinitialize with default data.

## 📱 Mobile Testing

The app is fully responsive! Test on:
- Desktop browsers
- Mobile browsers
- Tablet browsers
- Different screen sizes

## 🎨 Customization Testing

As Owner, you can customize:
- **Club Name** - Changes everywhere in the app
- **Club Logo** - Updates in navbar and login
- **Welcome Message** - Shows on user homepage
- **About Text** - Displays on user homepage
- **Maintenance Mode** - Blocks all non-owner access
- **Maintenance Message** - Custom message during maintenance

## 💡 Tips

1. **Use Quick Login Buttons** - On login page for fast role switching
2. **Check Notifications** - Users see notifications sent by admins
3. **Test Booking Flow** - Complete booking process is functional
4. **Try Maintenance Mode** - See how it blocks users/admins
5. **Explore All Tabs** - Each role has multiple tabs with features

## 🐛 Troubleshooting

### App not loading?
- Clear browser cache
- Check browser console for errors
- Try incognito/private mode

### Data not persisting?
- Check if LocalStorage is enabled
- Don't use private/incognito mode for persistence
- Check browser storage settings

### Can't login?
- Use exact credentials from above
- Check for typos
- Try quick login buttons

## 📞 Support

For issues or questions:
1. Check the main README.md
2. Review the code in the repository
3. Open an issue on GitHub

## 🎉 Enjoy!

Have fun exploring all the features of the Club Management System!
