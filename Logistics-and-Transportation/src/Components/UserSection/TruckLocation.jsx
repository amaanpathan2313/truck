import React, { useState } from "react";
import { useEffect } from "react";

function TruckLocation() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [data, setData] = useState([])

    function addLocation() {
        const obj = {
            location,
            date,
            time
        };
        console.log(obj);
        addData(obj);
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

    useEffect(() => {
        fetchData();
        console.log(data)
    }, [])

    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: `url(/adminhome2.avif)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white"
            }}
        >
            <h1>Pin Truck Location</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
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

                <button onClick={addLocation} style={{ padding: '10px 20px' }}>
                    Add Location
                </button>
            </div>

            <div>

            </div>


        </div>
    );
}

export default TruckLocation;
