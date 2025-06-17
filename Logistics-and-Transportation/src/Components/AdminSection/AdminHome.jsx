import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/auth/authSlice";

function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clickedCard, setClickedCard] = useState(null);
  const [logoutClicked, setLogoutClicked] = useState(false);

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
    height: "100vh",
    backgroundImage: `url(https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2vh 5vw",
    boxSizing: "border-box",
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "2vh",
  };

  const titleStyle = {
    color: 'white',
    // fontSize: '3vh',
    flex: 1,
    textAlign: 'center',
  };

  const logoutBtn = {
    padding: "10px 20px",
    backgroundColor: logoutClicked ? "#c62828" : "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "2vh",
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.3s ease",
    transform: logoutClicked ? "scale(1.05)" : "scale(1)",
  };

  const cardContainer = {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    width: "100%",
    maxWidth: "1000px",
    marginTop: "4vh",
    padding: "0 1vw",
  };

  const cardBase = {
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  };

  const cardStyle = (index) => ({
    ...cardBase,
    transform: clickedCard === index ? "scale(1.05)" : "scale(1)",
   });

  const cardData = [
    { label: "Manage Driver Information", path: "/managedriver" },
    { label: "Manage Truck Information", path: "/managetruckinformation" },
    { label: "Manage Transport History", path: "/transporthistory" },
    { label: "Check Revenue", path: "/revenue" },
    { label: "Truck Maintenance", path: "/truckmaintanance" },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Admin Home</h1>
        <button onClick={signOut} style={logoutBtn}>Logout</button>
      </div>

      <div style={cardContainer}>
        {cardData.map((card, index) => (
          <div
            key={index}
            style={cardStyle(index)}
            onClick={() => handleCardClick(card.path, index)}
          >
            <h2 style={{ fontSize: '2.2vh' }}>{card.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
