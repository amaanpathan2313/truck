import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DriverProfile() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    phon_No: "",
    carno: "",
    email: "",
    licenseNo: "",
    experience: ""
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  // Fetch all drivers
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist.json');
      const data = await response.json();
      
      if (data) {
        const driversArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setDrivers(driversArray);
      } else {
        setDrivers([]);
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create new driver
  const createDriver = async (driverData) => {
    try {
      const response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });
      
      if (response.ok) {
        await fetchDrivers();
        resetForm();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating driver:", error);
      return false;
    }
  };

  // Update driver
  const updateDriver = async (id, driverData) => {
    try {
      const response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });
      
      if (response.ok) {
        await fetchDrivers();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating driver:", error);
      return false;
    }
  };

  // Delete driver
  const deleteDriver = async (id) => {
    try {
      setDeletingId(id);
      const response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchDrivers();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting driver:", error);
      return false;
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      address: "",
      phon_No: "",
      carno: "",
      email: "",
      licenseNo: "",
      experience: ""
    });
    setEditingDriver(null);
    setIsAddingNew(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phon_No) {
      alert("Please fill in all required fields (Name, Email, Phone Number)");
      return;
    }

    const driverData = {
      name: formData.name,
      age: formData.age,
      address: formData.address,
      phon_No: formData.phon_No,
      carno: formData.carno,
      email: formData.email,
      licenseNo: formData.licenseNo,
      experience: formData.experience,
      updatedAt: new Date().toISOString()
    };

    let success = false;
    
    if (editingDriver) {
      success = await updateDriver(editingDriver.id, driverData);
      if (success) {
        alert("Driver updated successfully!");
      }
    } else {
      driverData.createdAt = new Date().toISOString();
      success = await createDriver(driverData);
      if (success) {
        alert("Driver added successfully!");
      }
    }

    if (success) {
      resetForm();
    } else {
      alert("Operation failed. Please try again.");
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setFormData({
      name: driver.name || "",
      age: driver.age || "",
      address: driver.address || "",
      phon_No: driver.phon_No || "",
      carno: driver.carno || "",
      email: driver.email || "",
      licenseNo: driver.licenseNo || "",
      experience: driver.experience || ""
    });
    setIsAddingNew(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const success = await deleteDriver(id);
      if (success) {
        alert("Driver deleted successfully!");
      } else {
        alert("Failed to delete driver. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const containerStyle = {
    margin: "-10px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "2vh 5vw",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '30px',
    padding: '20px 0',
  };

  const titleStyle = {
    color: 'white',
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: '700',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    margin: '10px 0',
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  };

  const cardContainerStyle = {
    display: 'grid',
    gap: '25px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    marginBottom: '40px',
  };

  const cardStyle = (id) => ({
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "16px",
    padding: "25px",
    color: "white",
    transition: "all 0.3s ease",
    transform: hoveredCard === id ? "translateY(-5px)" : "translateY(0)",
    boxShadow: hoveredCard === id ? "0 15px 40px rgba(0,0,0,0.25)" : "0 8px 32px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
  });

  const formContainerStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    marginBottom: "40px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const inputGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#1f2937",
    fontSize: "0.9rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    outline: "none",
  };

  const actionButtonStyle = {
    padding: "8px 16px",
    margin: "5px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          Loading Drivers...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .driver-card {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>

      <div style={headerStyle}>
        <h1 style={titleStyle}>👨‍💼 Driver Profiles</h1>
        <button
          style={buttonStyle}
          onClick={() => {
            resetForm();
            setIsAddingNew(true);
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#1d4ed8";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#2563eb";
            e.target.style.transform = "scale(1)";
          }}
        >
          + Add New Driver
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingDriver) && (
        <div style={formContainerStyle}>
          <h2 style={{ color: '#1f2937', marginBottom: '25px' }}>
            {editingDriver ? 'Edit Driver' : 'Add New Driver'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  name="phon_No"
                  value={formData.phon_No}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>License Number</label>
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Vehicle Number</label>
              <input
                type="text"
                name="carno"
                value={formData.carno}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#10b981',
                }}
              >
                {editingDriver ? 'Update Driver' : 'Add Driver'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#6b7280',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Drivers List */}
      <div style={cardContainerStyle}>
        {drivers.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            color: 'white',
            padding: '60px 20px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👨‍💼</div>
            <h3>No Drivers Found</h3>
            <p>Click "Add New Driver" to create your first driver profile.</p>
          </div>
        ) : (
          drivers.map((driver) => (
            <div
              key={driver.id}
              className="driver-card"
              style={cardStyle(driver.id)}
              onMouseEnter={() => setHoveredCard(driver.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 style={{ margin: '0', fontSize: '1.3rem', fontWeight: '600' }}>{driver.name}</h3>
                <div style={{ fontSize: '2rem' }}>🚚</div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                {driver.email && <p style={{ margin: '5px 0', opacity: '0.9' }}>📧 {driver.email}</p>}
                {driver.phon_No && <p style={{ margin: '5px 0', opacity: '0.9' }}>📞 {driver.phon_No}</p>}
                {driver.age && <p style={{ margin: '5px 0', opacity: '0.9' }}>🎂 Age: {driver.age}</p>}
                {driver.address && <p style={{ margin: '5px 0', opacity: '0.9' }}>🏠 {driver.address}</p>}
                {driver.carno && <p style={{ margin: '5px 0', opacity: '0.9' }}>🚗 Vehicle: {driver.carno}</p>}
                {driver.licenseNo && <p style={{ margin: '5px 0', opacity: '0.9' }}>📄 License: {driver.licenseNo}</p>}
                {driver.experience && <p style={{ margin: '5px 0', opacity: '0.9' }}>⭐ Experience: {driver.experience} years</p>}
              </div>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleEdit(driver)}
                  style={{
                    ...actionButtonStyle,
                    backgroundColor: '#3b82f6',
                    color: 'white',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(driver.id, driver.name)}
                  disabled={deletingId === driver.id}
                  style={{
                    ...actionButtonStyle,
                    backgroundColor: deletingId === driver.id ? '#9ca3af' : '#ef4444',
                    color: 'white',
                  }}
                  onMouseOver={(e) => {
                    if (deletingId !== driver.id) {
                      e.target.style.backgroundColor = '#dc2626';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (deletingId !== driver.id) {
                      e.target.style.backgroundColor = '#ef4444';
                    }
                  }}
                >
                  {deletingId === driver.id ? '🗑️ Deleting...' : '❌ Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DriverProfile;