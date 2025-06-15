import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'


function ManageDriver() {
    const [data, setData] = useState([])
    let navigate = useNavigate()
    async function fetchData() {
        try {
            let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist.json');
            let d = await response.json();

            let array = [];
            for (let key in d) {
                array.push(({ id: key, ...d[key] }))
            }

            //   console.log(array)
            setData(array)

        } catch (error) {

        }
    }


    async function removeUser(id) {
        try {
            let response = await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist/${id}.json`, {
                method: 'DELETE'
            })
        } catch (error) {
            console.log(error)
        } finally {
            fetchData()
        }

    }

    function editUser(id) {
        navigate(`/editdriver/${id}`)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div style={{
                height: "120vh",
                backgroundImage: `url(https://images.unsplash.com/photo-1595900604598-4667e6437839?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
            }}>

                <h2 style={{ textAlign: 'center', padding: '20px' }}>Manage Driver Information</h2>

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
                            minHeight: '35vh'
                        }}>

                            <h4>Name : {ele.name}</h4>
                            {ele.age && <p>Age : {ele.age}</p>}
                            {ele.address && <p>Address : {ele.address}</p>}
                            {ele.phon_No && <p>Phon No. : {ele.phon_No}</p>}
                            {ele.carno && <p>Number Plate : {ele.carno}</p>}
                            <button onClick={() => editUser(ele.id)} style={{ padding: '10px', width: '50%' }}>Edit</button>
                            <button onClick={() => removeUser(ele.id)} style={{ padding: '10px', width: '50%' }} >Remove</button>


                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default ManageDriver;