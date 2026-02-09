import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/maps', label: 'Maps', icon: '🗺️' },
    { path: '/community', label: 'Community', icon: '👥' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/fostering', label: 'Fostering', icon: '🐱' },
    { path: '/account', label: 'My Account', icon: '👤' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* PURPLE SIDEBAR */}
      <div style={{
        width: '250px',
        backgroundColor: '#6B46C1', // Purple color
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        {/* LOGO */}
        <div style={{
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '36px',
            margin: 0,
            fontFamily: 'Arial, sans-serif'
          }}>
            Mishi
          </h1>
          <div style={{
            color: 'white',
            fontSize: '40px',
            marginTop: '10px'
          }}>
            🐱
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 25px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '18px',
                backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                borderLeft: isActive(item.path) ? '4px solid white' : '4px solid transparent',
                transition: 'all 0.3s ease',
                marginBottom: '5px'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ marginRight: '12px', fontSize: '20px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <div style={{ padding: '20px 25px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{
        marginLeft: '250px', // Space for fixed sidebar
        flex: 1,
        padding: '20px',
        backgroundColor: 'white',
        minHeight: '100vh'
      }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;