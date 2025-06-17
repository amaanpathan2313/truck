import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Features/auth/authSlice";

function AdminHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [hoverCard, setHoverCard] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const signOut = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    const styles = {
        container: {
            height: "100vh",
            backgroundImage: `url('../../../public/adminhome2.avif')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "2vh",
        },
        header: {
            width: "100%",
            maxWidth: "1200px",
            padding: isMobile ? "1rem" : "2vh 5vw",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: isMobile ? "10px" : "0"
        },
        title: {
            fontSize: isMobile ? "2rem" : "4rem",
            textAlign: "center",
            width: "100%",
            margin: 0,
            color: "white",
        },
        button: {
            padding: isMobile ? "10px 18px" : "12px 24px",
            fontSize: isMobile ? "1rem" : "1.1rem",
            border: "none",
            backgroundColor: "#f44336",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.3s",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        },
        buttonActive: {
            transform: "scale(0.95)",
            backgroundColor: "#d32f2f",
        },
        main: {
            maxWidth: "1200px",
            width: "100%",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: isMobile ? "1rem" : "2rem",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center"
        },
        card: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "2rem",
            borderRadius: "15px",
            width: isMobile ? "90%" : "300px",
            minHeight: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s",
        },
        cardHover: {
            transform: "translateY(-5px) scale(1.03)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        },
        cardTitle: {
            fontSize: "1.5rem",
            color: "#333",
            margin: 0,
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>User Home</h1>
                <button
                    style={{
                        ...styles.button,
                        ...(buttonPressed ? styles.buttonActive : {})
                    }}
                    onMouseDown={() => setButtonPressed(true)}
                    onMouseUp={() => setButtonPressed(false)}
                    onTouchStart={() => setButtonPressed(true)}
                    onTouchEnd={() => setButtonPressed(false)}
                    onClick={signOut}
                >
                    Logout
                </button>
            </div>

            <div style={styles.main}>
                <div
                    style={{
                        ...styles.card,
                        ...(hoverCard === 1 ? styles.cardHover : {})
                    }}
                    onMouseEnter={() => setHoverCard(1)}
                    onMouseLeave={() => setHoverCard(null)}
                    onClick={() => navigate('/trucklocation')}
                >
                    <h2 style={styles.cardTitle}>Truck Location</h2>
                </div>
                <div
                    style={{
                        ...styles.card,
                        ...(hoverCard === 2 ? styles.cardHover : {})
                    }}
                    onMouseEnter={() => setHoverCard(2)}
                    onMouseLeave={() => setHoverCard(null)}
                    onClick={() => navigate('/truckmaintanance')}
                >
                    <h2 style={styles.cardTitle}>Truck Maintenance</h2>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
