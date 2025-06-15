import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Styles/Registration.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../Features/auth/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user, isError, isSuccess } = useSelector((state) => state.auth);

  // Handle form submission
  const onSubmit = () => {
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

  // Show errors if any
  useEffect(() => {
    if (isError) {
      setError(isError);
    }
  }, [isError]);

  // Clear form on success
  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isSuccess]);

  // Navigate based on user
  useEffect(() => {
    if (user === "admin@gmail.com") {
      navigate("/adminhome");
    } else if (user) {
      navigate("/userhome");
    }
  }, [user]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(../../../../../src/assets/registration_page.jpg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "whitesmoke", textAlign: "center", paddingTop: "10vh" }}>
        Login Page
      </h1>

      <div
        style={{
          marginTop: "10vh",
          width: "25vw",
          padding: "45px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#000",
        }}
      >
        <h3 style={{ color: "whitesmoke", textAlign: "center" }}>
          🚛 Logistics and Transportation 🚚
        </h3>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", border: "1px solid gainsboro" }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", border: "1px solid gainsboro" }}
        />

        <button
          onClick={onSubmit}
          style={{
            padding: "10px",
            border: "1px solid gainsboro",
            cursor: isLoading ? "default" : "pointer",
            backgroundColor: isLoading ? "#ccc" : "#fff",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p style={{ color: 'red' }}>{error}</p>

        <h4 style={{ textAlign: "center", color: "whitesmoke" }}>
          Already have an account?{" "}
          <Link
            to="/registration"
            style={{ textDecoration: "none", color: "#00f" }}
          >
            SignUp
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
