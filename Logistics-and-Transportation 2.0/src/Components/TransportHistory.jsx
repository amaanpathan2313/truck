 import React, { useState, useEffect } from "react";

function TransportHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState({
    driverName: "",
    driverContact: "",
    truckNumber: "",
    truckType: "",
    route: "",
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    distance: "",
    cargo: "",
    cargoWeight: "",
    cargoType: "",
    status: "scheduled",
    revenue: "",
    fuelCost: "",
    maintenanceCost: "",
    tollCost: "",
    otherCosts: "",
    notes: ""
  });

  // Fetch all history records
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history.json');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      
      if (data) {
        const historyArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setHistory(historyArray);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      alert("Failed to load transport history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Create new history record
  const createHistoryRecord = async (recordData) => {
    try {
      const response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });
      
      if (response.ok) {
        await fetchHistory();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error creating history record:", error);
      return false;
    }
  };

  // UPDATE Operation - Only update status
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingStatusId(id);
      
      // First get the current record
      const currentRecord = history.find(record => record.id === id);
      if (!currentRecord) {
        alert("Record not found!");
        return false;
      }

      // Create updated record with new status
      const updatedRecord = {
        ...currentRecord,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };

      console.log("Updating record:", id, "with status:", newStatus);

      const response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });
      
      if (response.ok) {
        await fetchHistory();
        return true;
      } else {
        console.error("Update failed with status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error updating status:", error);
      return false;
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // DELETE Operation - Remove record
  const deleteHistoryRecord = async (id) => {
    try {
      setDeletingId(id);
      console.log("Deleting record with ID:", id);
      
      const response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history/${id}.json`, {
        method: 'DELETE',
      });
      
      console.log("Delete response status:", response.status);
      
      if (response.ok) {
        await fetchHistory();
        return true;
      } else {
        console.error("Delete failed with status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Error deleting history record:", error);
      return false;
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      driverName: "",
      driverContact: "",
      truckNumber: "",
      truckType: "",
      route: "",
      startLocation: "",
      endLocation: "",
      startDate: "",
      endDate: "",
      distance: "",
      cargo: "",
      cargoWeight: "",
      cargoType: "",
      status: "scheduled",
      revenue: "",
      fuelCost: "",
      maintenanceCost: "",
      tollCost: "",
      otherCosts: "",
      notes: ""
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
    
    // Enhanced validation
    const requiredFields = [
      'driverName', 'truckNumber', 'route', 
      'startLocation', 'endLocation', 'startDate'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields:\n• ${missingFields.join('\n• ')}`);
      return;
    }

    // Calculate total cost and profit
    const fuelCost = parseFloat(formData.fuelCost) || 0;
    const maintenanceCost = parseFloat(formData.maintenanceCost) || 0;
    const tollCost = parseFloat(formData.tollCost) || 0;
    const otherCosts = parseFloat(formData.otherCosts) || 0;
    const revenue = parseFloat(formData.revenue) || 0;
    
    const totalCost = fuelCost + maintenanceCost + tollCost + otherCosts;
    const profit = revenue - totalCost;

    const recordData = {
      ...formData,
      totalCost: totalCost.toFixed(2),
      profit: profit.toFixed(2),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const success = await createHistoryRecord(recordData);
    if (success) {
      alert("Transport record added successfully!");
      resetForm();
    } else {
      alert("Failed to add record. Please try again.");
    }
  };

  // EDIT Button Logic - Only for status updates
  const handleEditStatus = async (record) => {
    const newStatus = prompt(
      `Update delivery status for: ${record.route}\n\nCurrent Status: ${record.status}\n\nEnter new status (scheduled, in-progress, completed, cancelled):`,
      record.status
    );

    if (newStatus && newStatus !== record.status) {
      const validStatuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
      if (validStatuses.includes(newStatus.toLowerCase())) {
        const success = await updateStatus(record.id, newStatus.toLowerCase());
        if (success) {
          alert("Status updated successfully!");
        } else {
          alert("Failed to update status. Please try again.");
        }
      } else {
        alert("Invalid status. Please use: scheduled, in-progress, completed, or cancelled");
      }
    }
  };

  // Quick Status Update
  const handleQuickStatusUpdate = async (id, status) => {
    const success = await updateStatus(id, status);
    if (success) {
      alert(`Status updated to ${status} successfully!`);
    } else {
      alert("Failed to update status. Please try again.");
    }
  };

  // DELETE Button Logic
  const handleDelete = async (id, route) => {
    if (window.confirm(`Are you sure you want to delete the transport record for route: "${route}"?\n\nThis action cannot be undone.`)) {
      const success = await deleteHistoryRecord(id);
      if (success) {
        alert("Transport record deleted successfully!");
      } else {
        alert("Failed to delete record. Please try again.");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      case 'scheduled': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'cancelled': return '❌';
      case 'scheduled': return '📅';
      default: return '❓';
    }
  };

  const calculateProfit = (record) => {
    const revenue = parseFloat(record.revenue) || 0;
    const fuelCost = parseFloat(record.fuelCost) || 0;
    const maintenanceCost = parseFloat(record.maintenanceCost) || 0;
    const tollCost = parseFloat(record.tollCost) || 0;
    const otherCosts = parseFloat(record.otherCosts) || 0;
    return revenue - fuelCost - maintenanceCost - tollCost - otherCosts;
  };

  const filteredHistory = filterStatus === "all" 
    ? history 
    : history.filter(record => record.status === filterStatus);

  useEffect(() => {
    fetchHistory();
  }, []);

  // Styles (same as before)
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

  const filterContainerStyle = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '30px',
    justifyContent: 'center',
  };

  const filterButtonStyle = (status) => ({
    padding: "8px 16px",
    backgroundColor: filterStatus === status ? getStatusColor(status) : "rgba(255,255,255,0.2)",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  });

  const cardContainerStyle = {
    display: 'grid',
    gap: '25px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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
    padding: "10px 16px",
    margin: "5px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    minWidth: "120px",
  };

  const quickStatusButtonStyle = {
    padding: "6px 12px",
    margin: "2px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    color: "white",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          Loading Transport History...
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
          
          .history-card {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>

      <div style={headerStyle}>
        <h1 style={titleStyle}>🚛 Transport History</h1>
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
          + Add New Record
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={filterContainerStyle}>
        <button
          style={filterButtonStyle("all")}
          onClick={() => setFilterStatus("all")}
        >
          📊 All Records ({history.length})
        </button>
        <button
          style={filterButtonStyle("completed")}
          onClick={() => setFilterStatus("completed")}
        >
          ✅ Completed ({history.filter(r => r.status === 'completed').length})
        </button>
        <button
          style={filterButtonStyle("in-progress")}
          onClick={() => setFilterStatus("in-progress")}
        >
          🔄 In Progress ({history.filter(r => r.status === 'in-progress').length})
        </button>
        <button
          style={filterButtonStyle("scheduled")}
          onClick={() => setFilterStatus("scheduled")}
        >
          📅 Scheduled ({history.filter(r => r.status === 'scheduled').length})
        </button>
        <button
          style={filterButtonStyle("cancelled")}
          onClick={() => setFilterStatus("cancelled")}
        >
          ❌ Cancelled ({history.filter(r => r.status === 'cancelled').length})
        </button>
      </div>

      {/* Enhanced Add Form with All Details */}
      {isAddingNew && (
        <div style={formContainerStyle}>
          <h2 style={{ color: '#1f2937', marginBottom: '25px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
            📋 Add New Transport Record
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              
              {/* Driver Information */}
              <div style={{ ...inputGroupStyle, gridColumn: '1 / -1', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                <h3 style={{ color: '#374151', marginBottom: '15px' }}>👤 Driver Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={labelStyle}>Driver Name *</label>
                    <input
                      type="text"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                      placeholder="Enter driver full name"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Driver Contact</label>
                    <input
                      type="text"
                      name="driverContact"
                      value={formData.driverContact}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Phone number or email"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div style={{ ...inputGroupStyle, gridColumn: '1 / -1', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                <h3 style={{ color: '#374151', marginBottom: '15px' }}>🚚 Vehicle Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={labelStyle}>Truck Number *</label>
                    <input
                      type="text"
                      name="truckNumber"
                      value={formData.truckNumber}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                      placeholder="e.g., TRK-1234"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Truck Type</label>
                    <select
                      name="truckType"
                      value={formData.truckType}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="">Select truck type</option>
                      <option value="flatbed">Flatbed</option>
                      <option value="refrigerated">Refrigerated</option>
                      <option value="tanker">Tanker</option>
                      <option value="dry van">Dry Van</option>
                      <option value="container">Container</option>
                      <option value="dump">Dump Truck</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div style={{ ...inputGroupStyle, gridColumn: '1 / -1', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                <h3 style={{ color: '#374151', marginBottom: '15px' }}>🗺️ Route Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={labelStyle}>Route Name *</label>
                    <input
                      type="text"
                      name="route"
                      value={formData.route}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                      placeholder="e.g., NYC to LA"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Start Location *</label>
                    <input
                      type="text"
                      name="startLocation"
                      value={formData.startLocation}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                      placeholder="Starting point"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>End Location *</label>
                    <input
                      type="text"
                      name="endLocation"
                      value={formData.endLocation}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                      placeholder="Destination"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Distance (km)</label>
                    <input
                      type="number"
                      name="distance"
                      value={formData.distance}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Distance in kilometers"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div style={{ ...inputGroupStyle, gridColumn: '1 / -1', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                <h3 style={{ color: '#374151', marginBottom: '15px' }}>📅 Schedule Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={labelStyle}>Start Date & Time *</label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>End Date & Time</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cargo Information */}
              <div style={{ ...inputGroupStyle, gridColumn: '1 / -1', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                <h3 style={{ color: '#374151', marginBottom: '15px' }}>📦 Cargo Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={labelStyle}>Cargo Description</label>
                    <input
                      type="text"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="e.g., Electronics, Food, etc."
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Cargo Weight (kg)</label>
                    <input
                      type="number"
                      name="cargoWeight"
                      value={formData.cargoWeight}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Weight in kilograms"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Cargo Type</label>
                    <select
                      name="cargoType"
                      value={formData.cargoType}
                      onChange={handleInputChange}
                      style={inputStyle}
                    >
                      <option value="">Select cargo type</option>
                      <option value="general">General Merchandise</option>
                      <option value="perishable">Perishable Goods</option>
                      <option value="hazardous">Hazardous Materials</option>
                      <option value="oversized">Oversized Load</option>
                      <option value="refrigerated">Refrigerated Goods</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div style={{ ...inputGroupStyle, gridColumn: '1 / -1', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
                <h3 style={{ color: '#374151', marginBottom: '15px' }}>💰 Financial Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={labelStyle}>Revenue ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Total revenue"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Fuel Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="fuelCost"
                      value={formData.fuelCost}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Fuel expenses"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Maintenance Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="maintenanceCost"
                      value={formData.maintenanceCost}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Maintenance expenses"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Toll Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="tollCost"
                      value={formData.tollCost}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Toll expenses"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Other Costs ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="otherCosts"
                      value={formData.otherCosts}
                      onChange={handleInputChange}
                      style={inputStyle}
                      placeholder="Other expenses"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div style={{ ...inputGroupStyle, gridColumn: '1 / -1' }}>
                <h3 style={{ color: '#374151', marginBottom: '15px' }}>📝 Additional Information</h3>
                <div>
                  <label style={labelStyle}>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                    placeholder="Any additional notes or special instructions..."
                  />
                </div>
              </div>

            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px', justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  backgroundColor: '#10b981',
                  padding: '12px 30px',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#059669";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#10b981";
                  e.target.style.transform = "scale(1)";
                }}
              >
                💾 Save Transport Record
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
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#6b7280";
                  e.target.style.transform = "scale(1)";
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* History Records */}
      <div style={cardContainerStyle}>
        {filteredHistory.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            color: 'white',
            padding: '60px 20px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📊</div>
            <h3>No Transport Records Found</h3>
            <p>{filterStatus === "all" 
              ? "Click 'Add New Record' to create your first transport history record." 
              : `No ${filterStatus} records found.`}
            </p>
          </div>
        ) : (
          filteredHistory.map((record) => {
            const profit = calculateProfit(record);
            const isBeingUpdated = updatingStatusId === record.id;
            const isBeingDeleted = deletingId === record.id;
            
            return (
              <div
                key={record.id}
                className="history-card"
                style={cardStyle(record.id)}
                onMouseEnter={() => setHoveredCard(record.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', fontWeight: '600' }}>
                      {record.route}
                    </h3>
                    <p style={{ margin: '0', opacity: '0.8', fontSize: '0.9rem' }}>
                      {record.truckNumber} • {record.driverName}
                    </p>
                    {record.startLocation && record.endLocation && (
                      <p style={{ margin: '5px 0 0 0', opacity: '0.8', fontSize: '0.85rem' }}>
                        📍 {record.startLocation} → {record.endLocation}
                      </p>
                    )}
                  </div>
                  <div style={{
                    backgroundColor: getStatusColor(record.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                    {getStatusIcon(record.status)} {record.status}
                  </div>
                </div>
                
                {/* Display additional information if available */}
                {(record.cargo || record.distance) && (
                  <div style={{ marginBottom: '15px', fontSize: '0.9rem', opacity: '0.9' }}>
                    {record.cargo && <div>📦 {record.cargo} {record.cargoWeight && `(${record.cargoWeight}kg)`}</div>}
                    {record.distance && <div>🛣️ Distance: {record.distance} km</div>}
                    {record.profit && <div>💰 Profit: ${record.profit}</div>}
                  </div>
                )}
                
                {/* Quick Status Update Buttons */}
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', opacity: '0.8' }}>Quick Status:</p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {['scheduled', 'in-progress', 'completed', 'cancelled']
                      .filter(status => status !== record.status)
                      .map(status => (
                        <button
                          key={status}
                          onClick={() => handleQuickStatusUpdate(record.id, status)}
                          disabled={isBeingUpdated}
                          style={{
                            ...quickStatusButtonStyle,
                            backgroundColor: getStatusColor(status),
                            opacity: isBeingUpdated ? 0.6 : 1,
                          }}
                        >
                          {getStatusIcon(status)} {status}
                        </button>
                      ))
                    }
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleEditStatus(record)}
                    disabled={isBeingUpdated || isBeingDeleted}
                    style={{
                      ...actionButtonStyle,
                      backgroundColor: isBeingUpdated ? '#9ca3af' : '#3b82f6',
                      color: 'white',
                    }}
                  >
                    {isBeingUpdated ? '🔄 Updating...' : '✏️ Update Status'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(record.id, record.route)}
                    disabled={isBeingDeleted || isBeingUpdated}
                    style={{
                      ...actionButtonStyle,
                      backgroundColor: isBeingDeleted ? '#9ca3af' : '#ef4444',
                      color: 'white',
                    }}
                  >
                    {isBeingDeleted ? '🗑️ Deleting...' : '❌ Delete'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TransportHistory;