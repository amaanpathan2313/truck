import React, { useEffect, useState } from "react";

function TruckMaintanance() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
     window.open(
      "https://calendar.google.com/calendar/embed?src=427639aadea54e19940d5cb02c0420bc24052108c648b48d02dbbf7ff2f2bf16%40group.calendar.google.com&ctz=Asia%2FKolkata",
      "_blank"
    );
  }, []);

  const handleButtonClick = () => {
    setClicked(true);
    
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(https://images.unsplash.com/photo-1636545256808-c2f40f2b6cdb?q=80&w=1932&auto=format&fit=crop)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        color: "white",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "20px", fontFamily: 'TimesNewRoman', marginTop : '10vh' }}>Manage Truck Maintenance</h2>

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <iframe
          title="Google Calendar"
          src="https://calendar.google.com/calendar/embed?src=427639aadea54e19940d5cb02c0420bc24052108c648b48d02dbbf7ff2f2bf16%40group.calendar.google.com&ctz=Asia%2FKolkata"
          style={{
            border: "none",
            width: "100%",
            height: "60vh",
            backgroundColor: "#fff",
          }}
        ></iframe>
      </div>

      <button
        onClick={handleButtonClick}
        style={{
          marginTop: "30px",
          padding: "12px 25px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: clicked ? "#00b894" : "rgba(255, 255, 255, 0.2)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: clicked ? "scale(1.1)" : "scale(1)",
        }}
      >
        Open Calendar in New Tab
      </button>
    </div>
  );
}

export default TruckMaintanance;
