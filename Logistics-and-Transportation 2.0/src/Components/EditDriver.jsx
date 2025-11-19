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
        email: "",
        carno: "",
        experience: ""
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

            // Map all possible field names from database to form fields
            setUpdatedData({
                name: json.name || "",
                address: json.address || "",
                phon_No: json.phon_No || json.phone || json.phoneno || "",
                age: json.age || "",
                DrivingLicense_No: json.DrivingLicense_No || json.drivingLicense || json.licenseNo || json.carno || "",
                email: json.email || "",
                carno: json.carno || "",
                experience: json.experience || ""
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
            
            // Create the final data object with all fields
            const finalData = {
                name: updatedData.name,
                address: updatedData.address,
                phon_No: updatedData.phon_No,
                age: updatedData.age,
                DrivingLicense_No: updatedData.DrivingLicense_No,
                email: updatedData.email,
                carno: updatedData.carno,
                experience: updatedData.experience,
                updatedAt: new Date().toISOString()
            };

            // Preserve existing created date if available
            if (data.data && data.data.createdAt) {
                finalData.createdAt = data.data.createdAt;
            }

            console.log("Updating driver with data:", finalData);

            const response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            if (!response.ok) {
                throw new Error('Failed to update driver data');
            }

            alert(`✅ ${updatedData.name}'s data updated successfully!`);
            navigate('/drivers'); // Redirect to drivers list after successful update
        } catch (error) {
            console.error("Update Error:", error);
            alert("❌ Error updating driver: " + error.message);
        } finally {
            setIsUpdating(false);
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        
        // Enhanced validation
        if (!updatedData.name.trim()) {
            alert("⚠️ Please enter driver name");
            return;
        }
        if (!updatedData.phon_No.trim()) {
            alert("⚠️ Please enter phone number");
            return;
        }
        if (!updatedData.DrivingLicense_No.trim()) {
            alert("⚠️ Please enter driving license number");
            return;
        }
        if (!updatedData.age || updatedData.age < 18 || updatedData.age > 65) {
            alert("⚠️ Please enter a valid age between 18 and 65");
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
                <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '10px' }}>Please wait while we fetch the driver information</p>
            </div>
        </div>
    );
    
    if (data.isError) return (
        <div style={containerStyle}>
            <div style={errorStyle}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>❌</div>
                <h2 style={{ color: 'white', margin: '0 0 20px 0' }}>Error loading driver data</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px' }}>
                    We couldn't load the driver information. Please check your connection and try again.
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button 
                        onClick={fetchData}
                        style={retryButtonStyle}
                    >
                        🔄 Retry
                    </button>
                    <button 
                        onClick={() => navigate('/drivers')}
                        style={cancelButtonStyle}
                    >
                        ← Back to Drivers
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div style={containerStyle}>
            <style>
                {`
                    input:hover {
                        border-color: rgba(255,255,255,0.4) !important;
                    }
                    
                    input:focus {
                        border-color: #00b894 !important;
                        background-color: rgba(255,255,255,0.15) !important;
                        transform: translateY(-2px);
                    }
                    
                    input::placeholder {
                        color: rgba(255,255,255,0.5);
                    }

                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .form-container {
                        animation: slideIn 0.6s ease-out;
                    }
                `}
            </style>

            <form onSubmit={onSubmit} style={formStyle} className="form-container">
                <div style={headerStyle}>
                    <span style={backButtonStyle} onClick={() => navigate('/drivers')}>
                        ←
                    </span>
                    <h2 style={{ margin: 0, textAlign: 'center', flex: 1 }}>✏️ Edit Driver</h2>
                    <div style={{ width: '40px' }}></div> {/* Spacer for balance */}
                </div>
                
                <div style={formGridStyle}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>
                            👤 Driver Name *
                            <span style={requiredStar}> *</span>
                        </label>
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
                        <label style={labelStyle}>
                            📧 Email Address
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter email address" 
                            value={updatedData.email} 
                            onChange={onChange} 
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>
                            📞 Phone Number *
                            <span style={requiredStar}> *</span>
                        </label>
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
                        <label style={labelStyle}>
                            🎂 Age *
                            <span style={requiredStar}> *</span>
                        </label>
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
                        <label style={labelStyle}>
                            🏠 Address
                        </label>
                        <input 
                            type="text" 
                            name="address" 
                            placeholder="Enter full address" 
                            value={updatedData.address} 
                            onChange={onChange} 
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>
                            📄 Driving License No. *
                            <span style={requiredStar}> *</span>
                        </label>
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

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>
                            🚗 Vehicle Number
                        </label>
                        <input 
                            type="text" 
                            name="carno" 
                            placeholder="Enter vehicle number" 
                            value={updatedData.carno} 
                            onChange={onChange} 
                            style={inputStyle}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>
                            ⭐ Experience (Years)
                        </label>
                        <input 
                            type="number" 
                            name="experience" 
                            placeholder="Years of experience" 
                            value={updatedData.experience} 
                            onChange={onChange} 
                            style={inputStyle}
                            min="0"
                            max="50"
                        />
                    </div>
                </div>

                {/* Last Updated Info */}
                {data.data && data.data.updatedAt && (
                    <div style={lastUpdatedStyle}>
                        <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>
                            Last updated: {new Date(data.data.updatedAt).toLocaleString()}
                        </span>
                    </div>
                )}

                <div style={buttonGroupStyle}>
                    <button 
                        type="submit" 
                        disabled={isUpdating}
                        style={{
                            ...buttonStyle,
                            backgroundColor: isUpdating ? '#7f8c8d' : '#00b894',
                        }}
                        onMouseOver={(e) => {
                            if (!isUpdating) {
                                e.target.style.backgroundColor = '#00a085';
                                e.target.style.transform = 'translateY(-2px)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isUpdating) {
                                e.target.style.backgroundColor = '#00b894';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {isUpdating ? (
                            <>
                                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '8px' }}>🔄</span>
                                Updating...
                            </>
                        ) : (
                            '💾 Update Driver'
                        )}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={() => navigate('/drivers')}
                        style={cancelButtonStyle}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#57606f';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#636e72';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        ❌ Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

// Enhanced Styles
const containerStyle = {
    margin: "-8px",
    minHeight: "100vh",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1579034963892-388c821d1d9f?q=80&w=2070&auto=format&fit=crop)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '20px',
    padding: '30px',
    width: '90%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    color: 'white',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    position: 'relative',
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    borderBottom: '2px solid rgba(255,255,255,0.1)',
    paddingBottom: '15px',
};

const backButtonStyle = {
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255,255,255,0.1)',
};

const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
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
    display: 'flex',
    alignItems: 'center',
};

const requiredStar = {
    color: '#ff6b6b',
    marginLeft: '4px',
};

const inputStyle = {
    padding: '14px 16px',
    borderRadius: '10px',
    border: '2px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
};

const buttonStyle = {
    padding: '16px 24px',
    borderRadius: '10px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    fontFamily: 'inherit',
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
    padding: '50px',
    borderRadius: '20px',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,255,255,0.2)',
    maxWidth: '500px',
};

const errorStyle = {
    textAlign: 'center',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '50px',
    borderRadius: '20px',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255,255,255,0.2)',
    maxWidth: '500px',
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
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
};

const lastUpdatedStyle = {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
};

// Add spin animation for loading
// const spinAnimation = `
//     @keyframes spin {
//         from { transform: rotate(0deg); }
//         to { transform: rotate(360deg); }
//     }
// `;

// Add styles to document
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(spinAnimation, styleSheet.cssRules.length);

export default EditDriver;