
import React from "react";
import { useEffect } from "react";

function TruckMaintanance() {



    useEffect(() => {
        setTimeout(() => {
            alert("Add this google Calendar to your account to see all Details")
        }, 3200)
    }, [])

    return (
        <>



            <div

                style={{
                    height: "100vh",
                    backgroundImage: `url(https://images.unsplash.com/photo-1636545256808-c2f40f2b6cdb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column",
                    color: 'white',
                }}>

                <h2>Manage Truck Maintanance</h2>
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=427639aadea54e19940d5cb02c0420bc24052108c648b48d02dbbf7ff2f2bf16%40group.calendar.google.com&ctz=Asia%2FKolkata"
                    style={{ border: '10px', backgroundColor: 'pink', borderRight: '10px' }}
                    width="1100"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    title="Google Calendar"
                ></iframe>
            </div>


        </>
    )
}

export default TruckMaintanance;