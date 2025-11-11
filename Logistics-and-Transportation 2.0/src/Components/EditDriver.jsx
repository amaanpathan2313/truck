 import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function EditDriver() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [updatedData, setUpdatedData] = useState({
        name: "",
        address: "",
        phon_No: "",
        age: "",
        DrivingLicense_No: "",
    });

    const [data, setData] = useState({
        isLoading: true,
        isError: false,
        data: null,
    });

    const [isUpdating, setIsUpdating] = useState(false);

    function onChange(e) {
        const { name, value } = e.target;
        setUpdatedData(prev => ({ ...prev, [name]: value }));
    }

    async function fetchData() {
        try {
            setData({ isLoading: true, isError: false, data: null });

            const res = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`);
            
            if (!res.ok) {
                throw new Error('Failed to fetch driver data');
            }
            
            const json = await res.json();

            if (!json) {
                throw new Error('Driver not found');
            }

            setData({ isLoading: false, isError: false, data: json });

            // Map the database fields to your form fields
            setUpdatedData({
                name: json.name || "",
                address: json.address || "",
                phon_No: json.phon_No || json.phone || "",
                age: json.age || "",
                DrivingLicense_No: json.DrivingLicense_No || json.drivingLicense || json.carno || ""
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            setData({ isLoading: false, isError: true, data: null });
            alert("Error loading driver data: " + error.message);
        }
    }

    async function updateData() {
        try {
            setIsUpdating(true);
            
            const response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update driver data');
            }

            alert(`${updatedData.name}'s data updated successfully!`);
            navigate('/drivers'); // Redirect to drivers list after successful update
        } catch (error) {
            console.error("Update Error:", error);
            alert("Error updating driver: " + error.message);
        } finally {
            setIsUpdating(false);
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        
        // Basic validation
        if (!updatedData.name.trim()) {
            alert("Please enter driver name");
            return;
        }
        if (!updatedData.DrivingLicense_No.trim()) {
            alert("Please enter driving license number");
            return;
        }
        
        updateData();
    }

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    if (data.isLoading) return (
        <div style={containerStyle}>
            <div style={loadingStyle}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
                <h2 style={{ color: 'white', margin: 0 }}>Loading driver data...</h2>
            </div>
        </div>
    );
    
    if (data.isError) return (
        <div style={containerStyle}>
            <div style={errorStyle}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>❌</div>
                <h2 style={{ color: 'white', margin: '0 0 20px 0' }}>Error loading driver data</h2>
                <button 
                    onClick={fetchData}
                    style={retryButtonStyle}
                >
                    🔄 Retry
                </button>
            </div>
        </div>
    );

    return (
        <div style={containerStyle}>
            <form onSubmit={onSubmit} style={formStyle}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>✏️ Edit Driver</h2>
                
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Driver Name *</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter driver name" 
                        value={updatedData.name} 
                        onChange={onChange} 
                        style={inputStyle}
                        required 
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Address *</label>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder="Enter address" 
                        value={updatedData.address} 
                        onChange={onChange} 
                        style={inputStyle}
                        required 
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Phone Number *</label>
                    <input 
                        type="tel" 
                        name="phon_No" 
                        placeholder="Enter phone number" 
                        value={updatedData.phon_No} 
                        onChange={onChange} 
                        style={inputStyle}
                        required 
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Age *</label>
                    <input 
                        type="number" 
                        name="age" 
                        placeholder="Enter age" 
                        value={updatedData.age} 
                        onChange={onChange} 
                        style={inputStyle}
                        min="18"
                        max="65"
                        required 
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Driving License No. *</label>
                    <input 
                        type="text" 
                        name="DrivingLicense_No" 
                        placeholder="Enter driving license number" 
                        value={updatedData.DrivingLicense_No} 
                        onChange={onChange} 
                        style={inputStyle}
                        required 
                    />
                </div>

                <div style={buttonGroupStyle}>
                    <button 
                        type="submit" 
                        disabled={isUpdating}
                        style={{
                            ...buttonStyle,
                            backgroundColor: isUpdating ? '#7f8c8d' : '#00b894',
                            transform: isUpdating ? 'none' : 'translateY(0)',
                        }}
                        onMouseOver={(e) => {
                            if (!isUpdating) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.backgroundColor = '#00a085';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isUpdating) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.backgroundColor = '#00b894';
                            }
                        }}
                    >
                        {isUpdating ? '🔄 Updating...' : '💾 Update Driver'}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/drivers')}
                        style={cancelButtonStyle}
                    >
                        ❌ Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

// Styles
const containerStyle = {
    margin: "-8px",
    minHeight: "100vh",
    backgroundImage: `url(https://images.unsplash.com/photo-1579034963892-388c821d1d9f?q=80&w=2070&auto=format&fit=crop)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
};

const formStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '15px',
    padding: '30px',
    width: '90%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    color: 'white',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const labelStyle = {
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#dfe6e9',
};

const inputStyle = {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
};

const buttonStyle = {
    padding: '14px 20px',
    borderRadius: '8px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
};

const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#636e72',
    flex: 0.5,
};

const loadingStyle = {
    textAlign: 'center',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '40px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
};

const errorStyle = {
    textAlign: 'center',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '40px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
};

const retryButtonStyle = {
    padding: '12px 24px',
    backgroundColor: '#00b894',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
};

// Add hover effects for inputs
const inputHoverStyle = `
    input:hover {
        border-color: rgba(255,255,255,0.4) !important;
    }
    
    input:focus {
        border-color: #00b894 !important;
        background-color: rgba(255,255,255,0.15) !important;
    }
    
    input::placeholder {
        color: rgba(255,255,255,0.5);
    }
`;

// Add style tag for hover effects
const styleTag = document.createElement('style');
styleTag.innerHTML = inputHoverStyle;
document.head.appendChild(styleTag);

export default EditDriver;