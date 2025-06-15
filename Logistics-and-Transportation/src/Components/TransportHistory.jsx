import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function TransportHistory() {

    const [data, setData] = useState([])
    let [obj, setObj] = useState({
        date: "",
        time: "",
        from: "",
        to: "",
        distance: 0,
        amount: 0,
    })

    async function fetchData() {
        try {
            let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history.json');
            let d = await response.json();

            let array = [];
            for (let key in d) {
                array.push(({ id: key, ...d[key] }))
            }

            console.log(array)
            setData(array)

        } catch (error) {

        }
    }



    async function addData() {
        try {
            let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            })
        } catch (error) {
            console.log(error)
        }
    }

    function onChange(e) {
        const { name, value } = e.target;
        setObj((pri => ({ ...pri, [name]: value })));

    }

    function onSubmit(e) {
        e.preventDefault()

        console.log(obj)
        addData()


        setObj({
            date: "",
            time: "",
            from: "",
            to: "",
            distance: 0,
            amount: 0,
        })

    }

    async function removeUser(id) {
        try {
            let response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history/${id}.json`, {
                method: 'DELETE'
            })
        } catch (error) {
            console.log(error)
        } finally {
            fetchData()
        }

    }


    useEffect(() => {
        fetchData()
    },[obj])
    return (
        <>

            <div

                style={{
                    height: "1500px",
                    backgroundImage: `url(https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "flex",
                    flexDirection: "column",

                }}>

                <h2 style={{ textAlign: 'center', padding: '20px', color: 'white' }}>Manage History</h2>

                <div className="newtruck" style={{

                    color: "#000",
                }}>
                    <form onSubmit={onSubmit}>
                        <input type="Date" placeholder="Enter Company Name" value={obj.date} name="date" onChange={(e) => onChange(e)} />
                        <input type="time" placeholder="Enter Model No" value={obj.time} name="time" onChange={(e) => onChange(e)} />
                        <input type="text" placeholder="From" value={obj.from} name="from" onChange={(e) => onChange(e)} />
                        <input type="text" placeholder="To" value={obj.to} name="to" onChange={(e) => onChange(e)} />
                        <input type="number" placeholder="Distance" value={obj.distance} name="distance" onChange={(e) => onChange(e)} />
                        <input type="number" placeholder="Enter Charge amount" value={obj.amount} name="amount" onChange={(e) => onChange(e)} />
                        <button type="submit">ADD Todays Log</button>

                    </form>
                </div>


                <div className="display-info">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                        padding: '10px',
                        height: 'auto',
                        borderRadius: '20px',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(4px)',
                        width: '90vw',
                        margin: 'auto',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                    }}
                    >





                        {data && data.map((ele) => (
                            <div key={ele.id} style={{
                                textAlign: 'center',
                                border: '3px solid rgb(237, 232, 232)',
                                borderRadius: '10px',
                                padding: '10px',
                                margin: '10px',
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                                // height: '20vh',
                                width: '20vw',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '20px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px',
                                minHeight: '35vh',
                            }}>

                                <h4>Date : {ele.date}</h4>
                                <p>Starting Time : {ele.time}</p>
                                <p>From : {ele.from}</p>
                                <p>To : {ele.to}</p>
                                <p> Total Distance : {ele.distance} Km</p>
                                <p> Total amount: {ele.amount} Rs</p>
                                <button onClick={() => editUser(ele.id)} style={{ padding: '10px', width: '50%' }}>Edit</button>
                                <button onClick={() => removeUser(ele.id)} style={{ padding: '10px', width: '50%' }} >Remove</button>


                            </div>
                        ))}
                    </div>
                </div>


            </div>

        </>
    )
}

export default TransportHistory;