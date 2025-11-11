 import React, { useState } from "react";
import { useEffect } from "react";

function TruckLocation() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [data, setData] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [showDrivers, setShowDrivers] = useState(false);
    const [loading, setLoading] = useState(false);

    function addLocation() {
        const obj = {
            location,
            date,
            time
        };
        console.log(obj);
        addData(obj);
        
        // After adding location, fetch available drivers
        fetchAvailableDrivers();
        setShowDrivers(true);
    }

    async function fetchAvailableDrivers() {
        setLoading(true);
        try {
            let res = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/drivers.json');
            let driverData = await res.json();

            let driversArray = [];
            for (let key in driverData) {
                driversArray.push({ 
                    id: key, 
                    ...driverData[key],
                    available: driverData[key].available !== false // Default to true if not specified
                });
            }

            // Filter available drivers
            const availableDrivers = driversArray.filter(driver => driver.available);
            setDrivers(availableDrivers);
             
        } catch (error) {
            console.log("Error fetching drivers:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchData(){
        try {
            let res = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/location.json')
            let d = await res.json();

            let array = [];
            for (let key in d) {
                array.push(({ id: key, ...d[key] }))
            }

            setData(array)
             
        } catch (error) {
            console.log(error)
        }
    }

    async function addData(obj) {
        try {
            const response = await fetch(
                "https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/location.json",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(obj)
                }
            );
            console.log("Location added successfully!");
        } catch (error) {
            console.log("Error adding location:", error);
        }
    }

    async function handleBookDriver(driverId) {
        try {
            // Update driver availability
            const response = await fetch(
                `https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/drivers/${driverId}.json`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        available: false,
                        bookedLocation: location,
                        bookedDate: date,
                        bookedTime: time
                    })
                }
            );

            if (response.ok) {
                alert("Driver booked successfully!");
                // Refresh drivers list
                fetchAvailableDrivers();
            }
        } catch (error) {
            console.log("Error booking driver:", error);
            alert("Error booking driver. Please try again.");
        }
    }

    // Initialize drivers data structure in Firebase (run this once)
    async function initializeDriversData() {
        const initialDrivers = {
            driver1: {
                name: "John Doe",
                vehicle: "Toyota Hilux",
                rating: 4.8,
                experience: "5 years",
                phone: "+1234567890",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                available: true
            },
            driver2: {
                name: "Jane Smith",
                vehicle: "Ford Ranger",
                rating: 4.9,
                experience: "7 years",
                phone: "+1234567891",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                available: true
            },
            driver3: {
                name: "Mike Johnson",
                vehicle: "Isuzu D-Max",
                rating: 4.7,
                experience: "4 years",
                phone: "+1234567892",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                available: true
            }
        };

        try {
            await fetch(
                "https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/drivers.json",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(initialDrivers)
                }
            );
            console.log("Drivers data initialized!");
        } catch (error) {
            console.log("Error initializing drivers:", error);
        }
    }

    useEffect(() => {
        fetchData();
        // Uncomment the line below to initialize drivers data (run once)
        // initializeDriversData();
    }, [])

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundImage: `url(/adminhome2.avif)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                color: "white",
                padding: "20px"
            }}
        >
            <h1>Pin Truck Location</h1>

            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px'
            }}>
                <input
                    type="text"
                    placeholder="Paste Location URL"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ width: '30vw', padding: '10px' }}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{ padding: '10px' }}
                />

                <a
                    href="https://www.google.com/maps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'black',
                        textAlign: 'center'
                    }}
                >
                    Select Your Location
                </a>

                <button 
                    onClick={addLocation} 
                    style={{ 
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Add Location & Find Drivers
                </button>
            </div>

            {/* Drivers Section */}
            {showDrivers && (
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                    <h2>Available Drivers</h2>
                    
                    {loading ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: 'white'
                        }}>
                            <p>Loading available drivers...</p>
                        </div>
                    ) : (
                        <>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '20px',
                                marginTop: '20px'
                            }}>
                                {drivers.map(driver => (
                                    <div key={driver.id} style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '10px',
                                        padding: '20px',
                                        color: 'black',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <img 
                                                src={driver.image} 
                                                alt={driver.name}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/60x60/cccccc/969696?text=Driver';
                                                }}
                                            />
                                            <div>
                                                <h3 style={{ margin: '0', color: '#333' }}>{driver.name}</h3>
                                                <p style={{ margin: '5px 0', color: '#666' }}>{driver.vehicle}</p>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <p style={{ margin: '5px 0' }}>
                                                    <strong>Rating:</strong> ⭐ {driver.rating}
                                                </p>
                                                <p style={{ margin: '5px 0' }}>
                                                    <strong>Experience:</strong> {driver.experience}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <p style={{ margin: '5px 0' }}>
                                            <strong>Phone:</strong> {driver.phone}
                                        </p>
                                        
                                        <button 
                                            onClick={() => handleBookDriver(driver.id)}
                                            style={{
                                                padding: '10px',
                                                backgroundColor: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                marginTop: '10px'
                                            }}
                                        >
                                            Book This Driver
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            {drivers.length === 0 && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: '10px',
                                    color: 'black'
                                }}>
                                    <h3>No drivers available at the moment</h3>
                                    <p>Please try again later or contact customer support.</p>
                                    <button 
                                        onClick={initializeDriversData}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginTop: '10px'
                                        }}
                                    >
                                        Initialize Sample Drivers
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default TruckLocation;