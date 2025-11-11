 import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ManageDriver() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
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
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist.json');
      const d = await response.json();
      const array = Object.keys(d || {}).map(key => ({ id: key, ...d[key] }));
      setData(array);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeUser(id) {
    try {
      setDeletingId(id);
      await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
        method: 'DELETE',
      });
      setTimeout(() => {
        fetchData();
        setDeletingId(null);
      }, 300);
    } catch (error) {
      console.error("Remove failed:", error);
      setDeletingId(null);
    }
  }

  function editUser(id) {
    navigate(`/editdriver/${id}`);
  }

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
        await fetchData();
        resetForm();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating driver:", error);
      return false;
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const success = await createDriver(driverData);
    if (success) {
      alert("Driver added successfully!");
    } else {
      alert("Failed to add driver. Please try again.");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await removeUser(id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const containerStyle = {
    margin: "-8px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1595900604598-4667e6437839?q=80&w=1983&auto=format&fit=crop)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "5vh 2vw",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '40px',
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: '700',
    textShadow: '0 4px 8px rgba(0,0,0,0.5)',
    animation: 'fadeInDown 0.8s ease-out',
  };

  const headerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '30px',
    gap: '20px',
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

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    animation: 'fadeInUp 0.8s ease-out 0.2s both',
  };

  const cardStyle = (id) => ({
    background: 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    padding: '25px',
    color: 'white',
    textAlign: 'center',
    boxShadow: `
      0 8px 32px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(255,255,255,0.2),
      inset 0 -1px 0 rgba(0,0,0,0.1)
    `,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transform: hoveredCard === id ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
    position: 'relative',
    overflow: 'hidden',
    opacity: deletingId === id ? 0 : 1,
  });

  const cardContentStyle = {
    position: 'relative',
    zIndex: 2,
  };

  const driverIconStyle = {
    fontSize: '3rem',
    marginBottom: '15px',
    display: 'block',
    animation: 'bounce 2s infinite',
  };

  const infoStyle = {
    margin: '12px 0',
    fontSize: '1.1rem',
    fontWeight: '500',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
  };

  const editButtonStyle = {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '50px',
    border: 'none',
    background: 'linear-gradient(45deg, #007bff, #0056b3)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
    transform: 'scale(1)',
  };

  const deleteButtonStyle = {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '50px',
    border: 'none',
    background: deletingId ? '#666' : 'linear-gradient(45deg, #ff4d4d, #cc0000)',
    color: 'white',
    cursor: deletingId ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: deletingId ? 'none' : '0 4px 15px rgba(255,77,77,0.3)',
    transform: 'scale(1)',
  };

  // Add Driver Form Styles
  const formContainerStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    marginBottom: "40px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    maxWidth: "800px",
    margin: "0 auto 40px",
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

  const loadingStyle = {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5rem',
    animation: 'pulse 1.5s infinite',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    color: 'white',
    fontSize: '1.2rem',
    gridColumn: '1 / -1',
    padding: '60px 20px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

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

          @keyframes cardSlideIn {
            from {
              opacity: 0;
              transform: translateX(-50px) rotate(-5deg);
            }
            to {
              opacity: 1;
              transform: translateX(0) rotate(0);
            }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }

          button:hover {
            transform: scale(1.05) !important;
          }

          button:active {
            transform: scale(0.95) !important;
          }

          .delete-confirm {
            animation: shake 0.5s ease-in-out;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }
        `}
      </style>

      <div style={headerContainerStyle}>
        <h2 style={headerStyle}>
          🚚 Manage Drivers
        </h2>
        <button
          style={buttonStyle}
          onClick={() => setIsAddingNew(true)}
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

      {/* Add Driver Form */}
      {isAddingNew && (
        <div style={formContainerStyle}>
          <h2 style={{ color: '#1f2937', marginBottom: '25px', textAlign: 'center' }}>
            👨‍💼 Add New Driver
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                  placeholder="Enter driver full name"
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
                  placeholder="Enter email address"
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
                  placeholder="Enter phone number"
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
                  placeholder="Enter age"
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
                  placeholder="Enter license number"
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
                  placeholder="Years of experience"
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
                placeholder="Enter full address"
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
                placeholder="Enter vehicle number"
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px', justifyContent: 'center' }}>
              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#10b981',
                  padding: '12px 30px',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#059669";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#10b981";
                }}
              >
                💾 Add Driver
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#6b7280',
                  padding: '12px 30px',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#4b5563";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#6b7280";
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={loadingStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          Loading Drivers...
        </div>
      ) : data.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👨‍💼</div>
          <h3>No Drivers Found</h3>
          <p>Click "Add New Driver" to create your first driver profile.</p>
        </div>
      ) : (
        <div style={gridContainerStyle}>
          {data.map((ele, index) => (
            <div 
              key={ele.id}
              style={cardStyle(ele.id)}
              onMouseEnter={() => setHoveredCard(ele.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={cardContentStyle}>
                <span style={driverIconStyle}>👨‍💼</span>
                
                <h4 style={{ ...infoStyle, fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '10px' }}>
                  {ele.name}
                </h4>
                
                {ele.age && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>🎂 Age:</span> {ele.age}
                  </p>
                )}
                
                {ele.email && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>📧 Email:</span> {ele.email}
                  </p>
                )}
                
                {ele.DrivingLicense_No && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>📄 License No:</span> {ele.DrivingLicense_No}
                  </p>
                )}
                
                {ele.licenseNo && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>📄 License:</span> {ele.licenseNo}
                  </p>
                )}
                
                {ele.address && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>🏠 Address:</span> {ele.address}
                  </p>
                )}
                
                {ele.phon_No && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>📞 Phone:</span> {ele.phon_No}
                  </p>
                )}
                
                {ele.carno && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>🚗 Vehicle:</span> {ele.carno}
                  </p>
                )}

                {ele.experience && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>⭐ Experience:</span> {ele.experience} years
                  </p>
                )}

                <div style={buttonContainerStyle}>
                  <button 
                    onClick={() => editUser(ele.id)} 
                    style={editButtonStyle}
                    onMouseOver={(e) => {
                      e.target.style.background = 'linear-gradient(45deg, #0056b3, #003d82)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0,123,255,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'linear-gradient(45deg, #007bff, #0056b3)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,123,255,0.3)';
                    }}
                  >
                    ✏️ Edit
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(ele.id, ele.name)} 
                    style={deleteButtonStyle}
                    className={deletingId === ele.id ? 'delete-confirm' : ''}
                    onMouseOver={(e) => {
                      if (!deletingId) {
                        e.target.style.background = 'linear-gradient(45deg, #cc0000, #990000)';
                        e.target.style.boxShadow = '0 6px 20px rgba(255,77,77,0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!deletingId) {
                        e.target.style.background = 'linear-gradient(45deg, #ff4d4d, #cc0000)';
                        e.target.style.boxShadow = '0 4px 15px rgba(255,77,77,0.3)';
                      }
                    }}
                  >
                    {deletingId === ele.id ? '🗑️ Deleting...' : '❌ Delete'}
                  </button>
                </div>
              </div>
              
              {/* Animated background elements */}
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
      )}
    </div>
  );
}

export default ManageDriver;