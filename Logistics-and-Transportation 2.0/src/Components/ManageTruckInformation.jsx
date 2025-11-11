 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageTruckInformation() {
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({
    company: "",
    model_no: "",
    passing_date: "",
    insurance: "",
    puc: "",
    number: ""
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  let navigate = useNavigate();

  async function fetchData() {
    try {
      let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist.json');
      let d = await response.json();

      let array = [];
      for (let key in d) {
        array.push({ id: key, ...d[key] });
      }

      setData(array);
    } catch (error) {
      console.log(error);
    }
  }

  async function addData() {
    try {
      await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      });
      fetchData();
      // Reset form
      setObj({
        company: "",
        model_no: "",
        passing_date: "",
        insurance: "",
        puc: "",
        number: ""
      });
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setObj(prev => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    addData();
  }

  async function removeUser(id) {
    try {
      setDeletingId(id);
      await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist/${id}.json`, {
        method: 'DELETE'
      });
      setTimeout(() => {
        fetchData();
        setDeletingId(null);
      }, 300);
    } catch (error) {
      console.log(error);
      setDeletingId(null);
    }
  }

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

  const formContainerStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "60px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    marginBottom: "40px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    maxWidth: "600px",
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
    // border : "5px solid black",
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    outline: "none",
    color: "#1f2937",
    width : "80%"
  
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

  const truckIconStyle = {
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

  const deleteButtonStyle = {
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
    width: '100%',
    marginTop: '15px',
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

          input:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }
        `}
      </style>

      <h2 style={headerStyle}>
        🚛 Manage Truck Information
      </h2>

      {/* Add Truck Form */}
      <div style={formContainerStyle}>
        <h2 style={{ color: '#1f2937', marginBottom: '25px', textAlign: 'center' }}>
          ➕ Add New Truck
        </h2>
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Company Name *</label>
              <input
                type="text"
                name="company"
                value={obj.company}
                onChange={onChange}
                style={inputStyle}
                required
                placeholder="Enter company name"
              />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Model Number *</label>
              <input
                type="number"
                name="model_no"
                value={obj.model_no}
                onChange={onChange}
                style={inputStyle}
                required
                placeholder="Enter model number"
              />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Passing Date *</label>
              <input
                type="number"
                name="passing_date"
                value={obj.passing_date}
                onChange={onChange}
                style={inputStyle}
                required
                placeholder="Enter passing date"
              />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Insurance Expiry *</label>
              <input
                type="text"
                name="insurance"
                value={obj.insurance}
                onChange={onChange}
                style={inputStyle}
                required
                placeholder="Enter insurance expiry date"
              />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>PUC Expiry *</label>
              <input
                type="text"
                name="puc"
                value={obj.puc}
                onChange={onChange}
                style={inputStyle}
                required
                placeholder="Enter PUC expiry date"
              />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Truck Number *</label>
              <input
                type="text"
                name="number"
                value={obj.number}
                onChange={onChange}
                style={inputStyle}
                required
                placeholder="Enter truck number"
              />
            </div>
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
              🚛 Add Truck
            </button>
            <button
              type="button"
              onClick={() => setObj({
                company: "",
                model_no: "",
                passing_date: "",
                insurance: "",
                puc: "",
                number: ""
              })}
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
              🗑️ Clear
            </button>
          </div>
        </form>
      </div>

      {/* Trucks List */}
      <div style={gridContainerStyle}>
        {data.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚛</div>
            <h3>No Trucks Found</h3>
            <p>Add some trucks to get started with your fleet management.</p>
          </div>
        ) : (
          data.map((ele, index) => (
            <div 
              key={ele.id}
              style={cardStyle(ele.id)}
              onMouseEnter={() => setHoveredCard(ele.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={cardContentStyle}>
                <span style={truckIconStyle}>🚛</span>
                
                <h4 style={{ ...infoStyle, fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '10px' }}>
                  {ele.number}
                </h4>
                
                {ele.company && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>🏢 Company:</span> {ele.company}
                  </p>
                )}
                
                {ele.model_no && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>🔢 Model No:</span> {ele.model_no}
                  </p>
                )}
                
                {ele.passing_date && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>📅 Passing Date:</span> {ele.passing_date}
                  </p>
                )}
                
                {ele.insurance && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>📄 Insurance:</span> {ele.insurance}
                  </p>
                )}
                
                {ele.puc && (
                  <p style={infoStyle}>
                    <span style={{ opacity: 0.8 }}>✅ PUC:</span> {ele.puc}
                  </p>
                )}

                <button 
                  onClick={() => removeUser(ele.id)} 
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
                  {deletingId === ele.id ? '🗑️ Deleting...' : '❌ Remove Truck'}
                </button>
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
          ))
        )}
      </div>
    </div>
  );
}

export default ManageTruckInformation;