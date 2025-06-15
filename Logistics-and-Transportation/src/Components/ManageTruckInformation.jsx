import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/managetruckinfo.css'

function ManageTruckInformation() {

    const [data, setData] = useState([])
    let navigate = useNavigate()

    const [obj, setObj] = useState({
        company: "",
        model_no: "",
        passing_date: "",
        insurance: "",
        puc: "",
        number: ""

    })

    async function fetchData() {
        try {
            let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist.json');
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
            let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist.json', {
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

    }

    async function removeUser(id) {
        try {
            let response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist/${id}.json`, {
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
    }, [])

    return (
        <>
            <div

                style={{
                    height: "1500px",
                    backgroundImage: `url(https://images.unsplash.com/photo-1671190365057-b9a8f79d306f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "flex",
                    flexDirection: "column",

                }}>

                <h2 style={{ textAlign: 'center', padding: '20px' }}>Manage Truck Information</h2>

                <div className="newtruck" style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#000",
                }}>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Enter Company Name" value={obj.company} name="company" onChange={(e) => onChange(e)} />
                        <input type="number" placeholder="Enter Model No" value={obj.model_no} name="model_no" onChange={(e) => onChange(e)} />
                        <input type="number" placeholder="Enter Passing Date" value={obj.passing_date} name="passing_date" onChange={(e) => onChange(e)} />
                        <input type="text" placeholder="Enter Insurance  expiery Date" value={obj.insurance} name="insurance" onChange={(e) => onChange(e)} />
                        <input type="text" placeholder="Enter PUC expiery Date " value={obj.puc} name="puc" onChange={(e) => onChange(e)} />
                        <input type="text" placeholder="Enter Passing Number " value={obj.number} name="number" onChange={(e) => onChange(e)} />
                        <button type="submit">Add New Truck</button>

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

                                <h4>Passing No : {ele.number}</h4>
                                <p>Insurance : {ele.insurance}</p>
                                <p>Passing Date : {ele.passing_date}</p>
                                <p>Model No. : {ele.model_no}</p>
                                <p>Company Name : {ele.company}</p>
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

export default ManageTruckInformation;