import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './style/EditUser.css'

function EditDriver() {
    const { id } = useParams();

    let [updatedData, setUpdatedData] = useState({
        name: "",
        address: "",
        phon_No: 0,
        age : 0,
        carno : "" ,
    })

    function onChange(e) {
        const { name, value } = e.target;
        setUpdatedData(p => ({ ...p, [name]: value }))
    }

    const [data, setData] = useState({
        isLoading: true,
        isError: false,
        data: null,
    });

    async function fetchData() {
        try {
            setData(prev => ({ ...prev, isLoading: true, isError: false }));

            const response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`);
            const res = await response.json();

            setData(prev => ({
                ...prev,
                isLoading: false,
                data: res
            }));

            // Set form fields with fetched data
            setUpdatedData({
                name: res.name || "",
                address: res.address || "",
                phon_No: res.phon_No || ""
            });

            console.log("Fetched user data:", data);
        } catch (error) {
            setData(prev => ({ ...prev, isLoading: false, isError: true }));
            console.error("Fetch error:", error);
        }
    }

    async function updateData() {
        try {
            let response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/.json'
                },
                body: JSON.stringify(updatedData)
            })

            alert(`${updatedData.name}'s data update successfully `)
        } catch (error) {
            console.log(error)
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        updateData()
        console.table(updatedData)
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    if (data.isLoading) return <h2>Loading user data...</h2>;
    if (data.isError) return <h2>Something went wrong loading the user.</h2>;

    return (
        <>
        <div style={{
                height: "100vh",
                backgroundImage: `url(https://images.unsplash.com/photo-1579034963892-388c821d1d9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
            }}>

                <h1>Edit Driver Details </h1>
            <div className="container">
                <div>
                    <form onSubmit={onSubmit}>

                        <input type="text" placeholder="Enter Name" name="name" value={updatedData.name} onChange={(e) => onChange(e)} />
                        <input type="text" placeholder="Enter Address" name="address" value={updatedData.address} onChange={(e) => onChange(e)} />
                        <input type="number" placeholder="Enter Phon Number" name="phon_No" value={updatedData.phon_No} onChange={(e) => onChange(e)} />
                        <input type="number" placeholder="Enter age" name="age" value={updatedData.age} onChange={(e) => onChange(e)} />
                        <input type="text" placeholder="Enter Car no." name="carno" value={updatedData.carno} onChange={(e) => onChange(e)} />
                         <button type="submit">Update User</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default EditDriver;
