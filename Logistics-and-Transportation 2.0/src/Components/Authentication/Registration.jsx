 import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Features/auth/authSlice";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Add global CSS reset
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style); 
    };
  }, []);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const obj = { name, email, password };

  async function addData() {
    try {
      await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/drivers.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      });
    } catch (error) {
      console.log(error);
    }
  }

  function onSubmit() {
    console.log(email )
    setClicked(true);
    setTimeout(() => setClicked(false), 300);

    if (!email || !password || !name) {
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
    setName("");
    dispatch(signupUser({ email, password }));
    addData();
  }

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  // Enhanced styles with logistics theme
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },
    backgroundPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 0),
        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 0)
      `,
      backgroundSize: "50px 50px",
      backgroundPosition: "0 0, 25px 25px",
    },
    logo: {
      position: "absolute",
      top: isMobile ? "20px" : "40px",
      left: isMobile ? "20px" : "40px",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: 700,
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      color: "white",
      zIndex: 10,
    },
    contentWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "1200px",
      gap: isMobile ? "0" : "4rem",
    },
    leftSection: {
      flex: 1,
      color: "white",
      textAlign: isMobile ? "center" : "left",
      padding: isMobile ? "0 20px 40px" : "0",
    },
    leftTitle: {
      fontSize: isMobile ? "2.5rem" : "3.5rem",
      fontWeight: 800,
      lineHeight: 1.1,
      marginBottom: "1.5rem",
      background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    leftSubtitle: {
      fontSize: isMobile ? "1.125rem" : "1.25rem",
      opacity: 0.9,
      lineHeight: 1.6,
      marginBottom: "2rem",
    },
    featuresList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginTop: "2rem",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      fontSize: "1.1rem",
      opacity: 0.9,
    },
    formContainer: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: isMobile ? "30px 25px" : "40px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      width: isMobile ? "100%" : "400px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    formHeader: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    formIcon: {
      fontSize: "3rem",
      marginBottom: "1rem",
    },
    formTitle: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: "#1f2937",
      marginBottom: "0.5rem",
    },
    formSubtitle: {
      color: "#6b7280",
      fontSize: "1rem",
    },
    inputGroup: {
      marginBottom: "1.5rem",
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "15px 20px",
      fontSize: "1rem",
      borderRadius: "12px",
      border: "2px solid #063491ff",
      backgroundColor: "#7badbda6",
      transition: "all 0.3s ease",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#2563eb",
      boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
    },
    button: {
      width: "100%",
      padding: "16px",
      fontSize: "1.1rem",
      fontWeight: 600,
      cursor: "pointer",
      borderRadius: "12px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      transition: "all 0.3s ease",
      transform: clicked ? "scale(0.98)" : "scale(1)",
      boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)",
      position: "relative",
      overflow: "hidden",
    },
    buttonHover: {
      background: "#1d4ed8",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(37, 99, 235, 0.5)",
    },
    loadingButton: {
      backgroundColor: "#9ca3af",
      cursor: "not-allowed",
    },
    loginText: {
      textAlign: "center",
      color: "#6b7280",
      fontSize: "1rem",
      marginTop: "2rem",
    },
    loginLink: {
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: 600,
      marginLeft: "0.5rem",
      transition: "color 0.3s ease",
    },
    error: {
      color: "#dc2626",
      fontSize: "0.9rem",
      textAlign: "center",
      backgroundColor: "#fef2f2",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #fecaca",
      marginBottom: "1rem",
    },
    successMessage: {
      color: "#059669",
      fontSize: "0.9rem",
      textAlign: "center",
      backgroundColor: "#f0fdf4",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #bbf7d0",
      marginBottom: "1rem",
    },
  };

  // Hover effect handlers
  const handleButtonHover = (e, isHover) => {
    if (!isLoading && !clicked) {
      e.target.style.background = isHover ? styles.buttonHover.background : styles.button.backgroundColor;
      e.target.style.transform = isHover ? styles.buttonHover.transform : styles.button.transform;
      e.target.style.boxShadow = isHover ? styles.buttonHover.boxShadow : styles.button.boxShadow;
    }
  };

  const handleInputFocus = (e, isFocus) => {
    e.target.style.borderColor = isFocus ? styles.inputFocus.borderColor : styles.input.border;
    e.target.style.boxShadow = isFocus ? styles.inputFocus.boxShadow : 'none';
  };

  const handleLinkHover = (e, isHover) => {
    e.target.style.color = isHover ? '#1d4ed8' : styles.loginLink.color;
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.logo}>
        <span>🚚</span>
        <span>LogiTrack Pro</span>
      </div>

      <div style={styles.contentWrapper}>
        {!isMobile && (
          <div style={styles.leftSection}>
            <h1 style={styles.leftTitle}>
              Join Our Logistics Revolution
            </h1>
            <p style={styles.leftSubtitle}>
              Create your account and start managing your fleet with the most powerful logistics platform designed for transportation businesses.
            </p>
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <span>✅</span>
                <span>Real-time trip tracking</span>
              </div>
              <div style={styles.featureItem}>
                <span>✅</span>
                <span>Driver management tools</span>
              </div>
              <div style={styles.featureItem}>
                <span>✅</span>
                <span>Fleet analytics & reports</span>
              </div>
              <div style={styles.featureItem}>
                <span>✅</span>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
        )}

        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <div style={styles.formIcon}>🚛</div>
            <h2 style={styles.formTitle}>Create Account</h2>
            <p style={styles.formSubtitle}>Join thousands of logistics professionals</p>
          </div>

          {error && <div style={styles.error}>{error}</div>}
          {isSuccess && <div style={styles.successMessage}>Registration successful! Redirecting...</div>}

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => handleInputFocus(e, true)}
              onBlur={(e) => handleInputFocus(e, false)}
            />
          </div>

          {isLoading ? (
            <button 
              style={{ ...styles.button, ...styles.loadingButton }}
              disabled
            >
              Creating Account...
            </button>
          ) : (
            <button 
              onClick={onSubmit}
              style={styles.button}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Create Account
            </button>
          )}

          <p style={styles.loginText}>
            Already have an account?
            <Link 
              to="/login" 
              style={styles.loginLink}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;