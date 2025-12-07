import './MaintenancePage.css';

function MaintenancePage({ message }) {
  return (
    <div className="maintenance-page">
      <div className="maintenance-content fade-in">
        <div className="maintenance-icon">🔧</div>
        <h1>Under Maintenance</h1>
        <p>{message || 'We are currently under maintenance. Please check back soon!'}</p>
        <div className="maintenance-animation">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;
