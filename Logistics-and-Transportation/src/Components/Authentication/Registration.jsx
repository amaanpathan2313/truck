import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Features/auth/authSlice";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false); // For button animation

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const obj = { name, email };

  async function addData() {
    try {
      await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      });
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit() {
    setClicked(true); // Trigger animation
    setTimeout(() => setClicked(false), 300); // Reset animation state

    if (!email || !password) {
      setError("All fields are compulsory*");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters*");
      return;
    }
    if (isError) {
      setError(isError);
      return;
    }

    setError("");
    setEmail("");
    setPassword("");
    dispatch(signupUser({ email, password }));
    addData();
  }

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  // Responsive width
  const getResponsiveWidth = () => {
    const width = window.innerWidth;
    if (width <= 480) return "85vw"; // Mobile
    if (width <= 768) return "60vw"; // Tablet
    if (width <= 1024) return "40vw"; // Laptop
    return "25vw"; // Desktop
  };

  const styles = {
    container: {
      height: "100vh",
      backgroundImage: `url(https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg)`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      color: "whitesmoke",
      textAlign: "center",
      paddingTop: "8vh",
      fontSize: "4vh",
    },
    form: {
      marginTop: "6vh",
      width: getResponsiveWidth(),
      padding: "35px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    heading: {
      color: "whitesmoke",
      textAlign: "center",
      fontSize: "2.5vh",
    },
    input: {
      padding: "10px",
      fontSize: "2vh",
      borderRadius: "6px",
      border: "1px solid gainsboro",
    },
    button: {
      padding: "12px",
      fontSize: "2.2vh",
      cursor: "pointer",
      borderRadius: "6px",
      backgroundColor: "#2e7d32",
      color: "white",
      border: "none",
      transition: "transform 0.3s ease",
      transform: clicked ? "scale(1.05)" : "scale(1)",
    },
    loginText: {
      textAlign: "center",
      color: "whitesmoke",
      fontSize: "2vh",
    },
    loginLink: {
      textDecoration: "none",
      color: "#00f",
    },
    error: {
      color: "red",
      fontSize: "1.8vh",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registration Page</h1>
      <div style={styles.form}>
        <h3 style={styles.heading}>🚛 Logistics and Transportation 🚚</h3>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {isLoading ? (
          <button style={{ ...styles.button, backgroundColor: "#999" }}>
            Registering...
          </button>
        ) : (
          <button onClick={onSubmit} style={styles.button}>
            Register
          </button>
        )}

        <p style={styles.error}>{error}</p>

        <h4 style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLink}>Login</Link>
        </h4>
      </div>
    </div>
  );
}

export default Registration;
