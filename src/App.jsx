import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { storage, userService, settingsService } from './utils/storage';

// Pages
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import EventDetails from './pages/EventDetails';
import BookingHistory from './pages/BookingHistory';
import Profile from './pages/Profile';
import MaintenancePage from './pages/MaintenancePage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize storage
    storage.init();
    
    // Load current user
    const user = userService.getCurrentUser();
    setCurrentUser(user);
    
    // Load settings
    const appSettings = settingsService.get();
    setSettings(appSettings);
    
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    userService.logout();
    setCurrentUser(null);
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#6366f1'
      }}>
        Loading...
      </div>
    );
  }

  // Check maintenance mode
  if (settings?.maintenanceMode && (!currentUser || currentUser.role !== 'owner')) {
    return <MaintenancePage message={settings.maintenanceMessage} />;
  }

  return (
    <Router basename="/club-management-app">
      <Routes>
        <Route 
          path="/login" 
          element={
            currentUser ? 
              <Navigate to="/" replace /> : 
              <Login onLogin={handleLogin} settings={settings} />
          } 
        />
        
        <Route 
          path="/" 
          element={
            !currentUser ? 
              <Navigate to="/login" replace /> :
              currentUser.role === 'owner' ? 
                <OwnerDashboard 
                  user={currentUser} 
                  onLogout={handleLogout}
                  settings={settings}
                  onSettingsUpdate={updateSettings}
                /> :
              currentUser.role === 'admin' ?
                <AdminDashboard 
                  user={currentUser} 
                  onLogout={handleLogout}
                  settings={settings}
                /> :
                <UserDashboard 
                  user={currentUser} 
                  onLogout={handleLogout}
                  settings={settings}
                />
          } 
        />

        <Route 
          path="/event/:id" 
          element={
            !currentUser ? 
              <Navigate to="/login" replace /> :
              <EventDetails user={currentUser} onLogout={handleLogout} settings={settings} />
          } 
        />

        <Route 
          path="/bookings" 
          element={
            !currentUser ? 
              <Navigate to="/login" replace /> :
              <BookingHistory user={currentUser} onLogout={handleLogout} settings={settings} />
          } 
        />

        <Route 
          path="/profile" 
          element={
            !currentUser ? 
              <Navigate to="/login" replace /> :
              <Profile user={currentUser} onLogout={handleLogout} settings={settings} />
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
