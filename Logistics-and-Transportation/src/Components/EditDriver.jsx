import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './style/EditUser.css';

function EditDriver() {
    const { id } = useParams();

    const [updatedData, setUpdatedData] = useState({
        name: "",
        address: "",
        phon_No: "",
        age: "",
        carno: "",
    });

    const [data, setData] = useState({
        isLoading: true,
        isError: false,
        data: null,
    });

    function onChange(e) {
        const { name, value } = e.target;
        setUpdatedData(prev => ({ ...prev, [name]: value }));
    }

    async function fetchData() {
        try {
            setData({ isLoading: true, isError: false, data: null });

            const res = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`);
            const json = await res.json();

            setData({ isLoading: false, isError: false, data: json });

            setUpdatedData({
                name: json.name || "",
                address: json.address || "",
                phon_No: json.phon_No || "",
                age: json.age || "",
                carno: json.carno || ""
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            setData({ isLoading: false, isError: true, data: null });
        }
    }

    async function updateData() {
        try {
            await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            alert(`${updatedData.name}'s data updated successfully!`);
        } catch (error) {
            console.error("Update Error:", error);
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        updateData();
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    if (data.isLoading) return <h2 style={{ textAlign: 'center', color: 'white' }}>Loading user data...</h2>;
    if (data.isError) return <h2 style={{ textAlign: 'center', color: 'red' }}>Error loading user data.</h2>;

    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: `url(https://images.unsplash.com/photo-1579034963892-388c821d1d9f?q=80&w=2070&auto=format&fit=crop)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
        }}>
            <form onSubmit={onSubmit} style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '15px',
                padding: '30px',
                width: '90%',
                maxWidth: '500px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                color: 'white',
                boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Edit Driver</h2>
                <input type="text" name="name" placeholder="Enter Name" value={updatedData.name} onChange={onChange} required />
                <input type="text" name="address" placeholder="Enter Address" value={updatedData.address} onChange={onChange} required />
                <input type="number" name="phon_No" placeholder="Enter Phone Number" value={updatedData.phon_No} onChange={onChange} required />
                <input type="number" name="age" placeholder="Enter Age" value={updatedData.age} onChange={onChange} required />
                <input type="text" name="carno" placeholder="Enter Car No." value={updatedData.carno} onChange={onChange} required />
                <button type="submit" style={buttonStyle}>Update Driver</button>
            </form>
        </div>
    );
}

const buttonStyle = {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#00b894',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
};

export default EditDriver;
