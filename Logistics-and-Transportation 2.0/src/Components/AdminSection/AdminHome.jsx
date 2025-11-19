 import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/auth/authSlice";

function AdminHome() {
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    width: "100%",
    maxWidth: "1200px",
    marginTop: "2vh",
    padding: "20px",
  };

  const cardBase = {
    padding: "30px 20px",
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
    fontSize: "clamp(2rem, 6vw, 3rem)",
    marginBottom: "15px",
    opacity: "0.9",
  };

  const cardData = [
    { label: "Manage Driver Information", path: "/managedriver", icon: "👨‍💼" },
    { label: "Manage Truck Information", path: "/managetruckinformation", icon: "🚚" },
    { label: "Manage Transport History", path: "/transporthistory", icon: "📊" },
    { label: "Check Revenue", path: "/revenue", icon: "💰" },
    { label: "Truck Maintenance", path: "/truckmaintanance", icon: "🔧" },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Smart Fleet Management Hub</h1>
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
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', 
              margin: '0',
              fontWeight: '600',
              lineHeight: '1.4'
            }}>
              {card.label}
            </h2>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
              transform: 'scaleX(0)',
              transition: 'transform 0.3s ease',
              transformOrigin: 'left',
              ...(hoveredCard === index && { transform: 'scaleX(1)' })
            }}></div>
          </div>
        ))}
      </div>

      {/* Welcome message */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        maxWidth: '600px',
        lineHeight: '1.6'
      }}>
        <p>Welcome to Smart Fleet Management Hub. Select any option above to manage your fleet operations.</p>
      </div>
    </div>
  );
}

export default AdminHome;