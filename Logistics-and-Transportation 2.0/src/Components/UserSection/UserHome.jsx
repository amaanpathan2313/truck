 import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/auth/authSlice";

function UserHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clickedCard, setClickedCard] = useState(null);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  function signOut() {
    setLogoutClicked(true);
    setTimeout(() => {
      dispatch(logoutUser());
      navigate('/');
    }, 200);
  }

  const handleCardClick = (path, index) => {
    setClickedCard(index);
    setTimeout(() => {
      navigate(path);
    }, 200);
  };

  const containerStyle = {
    margin: "-10px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2vh 5vw",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "2vh",
    padding: "20px 0",
  };

  const titleStyle = {
    color: 'white',
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    margin: '10px 0',
  };

  const logoutBtn = {
    padding: "12px 24px",
    backgroundColor: logoutClicked ? "#c62828" : "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    transform: logoutClicked ? "scale(1.05)" : "scale(1)",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    minWidth: "120px",
  };

  const cardContainer = {
    display: "grid",
    gap: "25px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    width: "100%",
    maxWidth: "1000px",
    marginTop: "2vh",
    padding: "20px",
  };

  const cardBase = {
    padding: "40px 25px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
  };

  const cardHoverEffect = {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)",
    background: "rgba(255, 255, 255, 0.25)",
  };

  const cardClickEffect = {
    transform: "scale(0.95)",
  };

  const cardStyle = (index) => ({
    ...cardBase,
    ...(hoveredCard === index && cardHoverEffect),
    ...(clickedCard === index && cardClickEffect),
  });

  const iconStyle = {
    fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
    marginBottom: "20px",
    opacity: "0.9",
  };

  const cardData = [
    { 
      label: "Truck Location", 
      path: "/trucklocation", 
      icon: "📍",
      description: "Track your truck in real-time and view current locations"
    },
    { 
      label: "Truck Maintenance", 
      path: "/truckmaintanance", 
      icon: "🔧",
      description: "View maintenance schedules and service history"
    },
    { 
      label: "Trip History", 
      path: "/triphistory", 
      icon: "📋",
      description: "Access your complete trip logs and history"
    },
    { 
      label: "Driver Profile", 
      path: "/DriverProfile", 
      icon: "👨‍💼",
      description: "Manage your personal information and documents"
    },
  ];

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div style={headerStyle}>
        <h1 style={titleStyle}>Driver Dashboard</h1>
        <button 
          onClick={signOut} 
          style={logoutBtn}
          onMouseOver={(e) => {
            if (!logoutClicked) {
              e.target.style.backgroundColor = "#b71c1c";
              e.target.style.transform = "scale(1.05)";
            }
          }}
          onMouseOut={(e) => {
            if (!logoutClicked) {
              e.target.style.backgroundColor = "#d32f2f";
              e.target.style.transform = "scale(1)";
            }
          }}
        >
          {logoutClicked ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div style={cardContainer}>
        {cardData.map((card, index) => (
          <div
            key={index}
            style={cardStyle(index)}
            onClick={() => handleCardClick(card.path, index)}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={iconStyle}>{card.icon}</div>
            <h2 style={{ 
              fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)', 
              margin: '0 0 15px 0',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>
              {card.label}
            </h2>
            <p style={{
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              margin: '0',
              opacity: '0.9',
              lineHeight: '1.5'
            }}>
              {card.description}
            </p>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #4ecdc4, #ff6b6b)',
              transform: 'scaleX(0)',
              transition: 'transform 0.3s ease',
              transformOrigin: 'left',
              ...(hoveredCard === index && { transform: 'scaleX(1)' })
            }}></div>
            
            {/* Animated background element */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              zIndex: 1,
            }}></div>
          </div>
        ))}
      </div>

      {/* Welcome message */}
      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        maxWidth: '600px',
        lineHeight: '1.6',
        animation: 'fadeInUp 0.8s ease-out 0.3s both',
      }}>
        <p>Welcome to your driver dashboard. Access all your tools and information to manage your trips efficiently.</p>
      </div>

      {/* Quick Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '800px',
        marginTop: '40px',
        padding: '20px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🚛</div>
          <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1rem' }}>Active Trucks</h3>
          <p style={{ color: '#4ecdc4', margin: '0', fontSize: '1.5rem', fontWeight: 'bold' }}>12</p>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📅</div>
          <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1rem' }}>This Month</h3>
          <p style={{ color: '#ff6b6b', margin: '0', fontSize: '1.5rem', fontWeight: 'bold' }}>8 Trips</p>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⭐</div>
          <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1rem' }}>Rating</h3>
          <p style={{ color: '#f9c74f', margin: '0', fontSize: '1.5rem', fontWeight: 'bold' }}>4.8/5</p>
        </div>
      </div>
    </div>
  );
}

export default UserHome;