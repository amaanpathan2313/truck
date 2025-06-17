import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../Features/auth/authSlice";
import '../../Styles/Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user, isError, isSuccess } = useSelector((state) => state.auth);

  const onSubmit = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 250);

    if (!email || !password) {
      setError("All fields are compulsory*");
      return;
    }

    if (password.length < 6) {
      setError("Password length must be greater than 6 characters*");
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isError) {
      setError(isError);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (user === "admin@gmail.com") {
      navigate("/adminhome");
    } else if (user) {
      navigate("/userhome");
    }
  }, [user]);

  // Responsive width
  const getResponsiveWidth = () => {
    const width = window.innerWidth;
    if (width <= 480) return "85vw";
    if (width <= 768) return "60vw";
    if (width <= 1024) return "40vw";
    return "25vw";
  };

  const styles = {
    container: {
      padding : '0px',
      margin : '0px',
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
      paddingTop: "10vh",
      fontSize: "4vh",
    },
    form: {
      marginTop: "8vh",
      width: getResponsiveWidth(),
      padding: "40px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      borderRadius: "10px",
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
      border: "1px solid gainsboro",
      borderRadius: "6px",
    },
    button: {
      padding: "12px",
      fontSize: "2.2vh",
      borderRadius: "6px",
      border: "none",
      backgroundColor: isLoading ? "#aaa" : "#2e7d32",
      color: "white",
      cursor: isLoading ? "default" : "pointer",
      transform: clicked ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.25s ease-in-out",
    },
    error: {
      color: "red",
      fontSize: "1.8vh",
      textAlign: "center",
    },
    linkText: {
      textAlign: "center",
      color: "whitesmoke",
      fontSize: "2vh",
    },
    link: {
      textDecoration: "none",
      color: "#00f",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login Page</h1>
      <div style={styles.form}>
        <h3 style={styles.heading}>🚛 Logistics and Transportation 🚚</h3>

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

        <button
          onClick={onSubmit}
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.error}>{error}</p>

        <h4 style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/registration" style={styles.link}>
            SignUp
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
