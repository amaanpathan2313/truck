
import React from "react";
import { Link } from "react-router-dom";


function Index() {

    return (
        <>
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
            <h1>FleetManagerPro Logistics Transportation</h1>

                <div style={{
                    border: '3px solid white',
                    borderRadius : '10px',
                    width: '50vw',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding : '20px',
                    
                }}>
                    <Link to='/login' style={{textDecoration : 'none', color : 'white', fontSize: '5vh'}}>Login</Link>
                    <Link to='/registration' style={{textDecoration : 'none', color : 'white', fontSize: '5vh'}}>registration</Link>
                </div>
            </div>
        </>
    )
}


export default Index;