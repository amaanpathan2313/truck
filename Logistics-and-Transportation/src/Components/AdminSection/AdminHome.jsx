import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/auth/authSlice";
import './adminhome.css';

function AdminHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function signOut() {
        dispatch(logoutUser());
        navigate('/');
    }

    return (
        <>
        <div  style={{
        height: "100vh",
        backgroundImage: `url(../../../public/adminhome2.avif)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"}}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2vh 5vw' }}>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Admin Home</h1>
                <button className="button" onClick={signOut}>
                    Logout
                </button>
            </div>

            <div className="container">
                <div className="card card1" onClick={() => navigate('/managedriver')}>
                    <h2>Manage Driver Information</h2>
                </div>
                <div className="card card2" onClick={() => navigate('/managetruckinformation')}>
                    <h2>Manage Truck Information</h2>
                </div>
                <div className="card card3" onClick={() => navigate('/transporthistory')}>
                    <h2>Manage Transport History</h2>
                </div>
                <div className="card card4" onClick={() => navigate('/revenue')}>
                    <h2>Check Revenue</h2>
                </div>
                <div className="card card5" onClick={() => navigate('/truckmaintanance')}>
                    <h2>Truck Maintenance</h2>
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminHome;
