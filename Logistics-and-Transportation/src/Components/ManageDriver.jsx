import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ManageDriver() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist.json');
      const d = await response.json();
      const array = Object.keys(d || {}).map(key => ({ id: key, ...d[key] }));
      setData(array);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }

  async function removeUser(id) {
    try {
      await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error("Remove failed:", error);
    }
  }

  function editUser(id) {
    navigate(`/editdriver/${id}`);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(https://images.unsplash.com/photo-1595900604598-4667e6437839?q=80&w=1983&auto=format&fit=crop)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "5vh 2vw",
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#fff',
        marginBottom: '30px',
        fontSize: '3vh',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
      }}>
        Manage Driver Information
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: '15px',
        padding: '20px',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}>
        {data.map((ele) => (
          <div key={ele.id} style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s ease',
          }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <h4>Name: {ele.name}</h4>
            {ele.age && <p>Age: {ele.age}</p>}
            {ele.address && <p>Address: {ele.address}</p>}
            {ele.phon_No && <p>Phone No.: {ele.phon_No}</p>}
            {ele.carno && <p>Number Plate: {ele.carno}</p>}

            <button onClick={() => editUser(ele.id)} style={buttonStyle}>
              Edit
            </button>
            <button onClick={() => removeUser(ele.id)} style={{ ...buttonStyle, backgroundColor: "#ff4d4d" }}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Common Button Style with Animation
const buttonStyle = {
  padding: '10px',
  marginTop: '10px',
  width: '100%',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'transform 0.2s, background-color 0.3s',
  outline: 'none',
  marginBottom: '10px',
  animation: 'pulse 0.3s ease-in-out',
};

export default ManageDriver;
