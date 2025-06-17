import React from "react";
import { Link } from "react-router-dom";

function Index() {
  const containerStyle = {
    height: "100vh",
    backgroundImage: `url(/adminhome2.avif)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: "20px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "4vh",
    marginBottom: "30px",
  };

  const linkContainerStyle = {
    border: "3px solid white",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "600px",
    display: "flex",
    flexWrap: "wrap", // enables wrapping on smaller screens
    justifyContent: "space-around",
    padding: "20px",
    gap: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "3.5vh",
    transition: "color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>FleetManagerPro Logistics Transportation</h1>

      <div style={linkContainerStyle}>
        <Link
          to="/login"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = "#00f0ff")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Login
        </Link>

        <Link
          to="/registration"
          style={linkStyle}
          onMouseOver={(e) => (e.target.style.color = "#00f0ff")}
          onMouseOut={(e) => (e.target.style.color = "white")}
        >
          Registration
        </Link>
      </div>
    </div>
  );
}

export default Index;
