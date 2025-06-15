import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Styles/Registration.css'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from "../../Features/auth/authSlice";
import { useEffect } from "react";

function Registration() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [error, setError] = useState("");
  const dispatch = useDispatch()
  const { isLoading, user, isError, isSuccess } = useSelector((state) => state.auth)
  let navigate = useNavigate()

  let obj = {
    name : name,
    email : email
  }

  async function addData() {
        try {
          let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/userlist.json', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(obj)
          })
        } catch (error) {
          console.log(error)
        }
  }

  function onSubmit() {

    if (!email || !password) {
      setError("All fields are compulsory*");
      return; // Stop execution
    }

    if (password.length < 6) {
      setError("password Length must be greater then 6 Characters*");
      return;
    }


    if (isError) {
      setError(isError)
      return;
    }
    
    setError("")
    setEmail("")
    setPassword("")
    dispatch(signupUser({ email, password }));
    addData()
    console.log(isSuccess)

  }



  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
      navigate('/login')
    }

  }, [isSuccess, navigate])

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
      <h1
        style={{
          color: "whitesmoke",
          textAlign: "center",
          paddingTop: "10vh",
        }}
      >
        Registration Page
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
          type="text"
          placeholder="Enter Your Name"
          value={name}
          name='name'
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", border: "1px solid gainsboro" }}
        />






        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", border: "1px solid gainsboro" }}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", border: "1px solid gainsboro" }}
        />

        {isLoading ? (<button>Registring....</button>) : (
          <button
            onClick={() => onSubmit()}
            style={{
              padding: "10px",
              border: "1px solid gainsboro",
              cursor: "pointer",
            }}

          >
            Register
          </button>)}



        <p style={{ color: 'red' }}>{error}</p>

        <h4 style={{ textAlign: "center", color: "whitesmoke" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#00f" }}
          >
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Registration;
