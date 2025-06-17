import React, { useEffect, useState } from "react";

function TransportHistory() {
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({
    date: "",
    time: "",
    from: "",
    to: "",
    distance: 0,
    amount: 0,
  });
  const [clicked, setClicked] = useState(false); // for animation

  async function fetchData() {
    try {
      let response = await fetch(
        "https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history.json"
      );
      let d = await response.json();
      let array = [];
      for (let key in d) {
        array.push({ id: key, ...d[key] });
      }
      setData(array);
    } catch (error) {
      console.log(error);
    }
  }

  async function addData() {
    try {
      await fetch(
        "https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    addData();
    setClicked(true); // trigger animation
    setTimeout(() => setClicked(false), 400); // reset animation
    setObj({
      date: "",
      time: "",
      from: "",
      to: "",
      distance: 0,
      amount: 0,
    });
  }

  async function removeUser(id) {
    try {
      await fetch(
        `https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history/${id}.json`,
        { method: "DELETE" }
      );
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    width: "90%",
    maxWidth: "400px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transform: clicked ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease",
  };

  return (
    <div
      style={{
        minHeight: "150vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ textAlign: "center", padding: "20px", color: "white" }}>
        Manage Transport History
      </h2>

      {/* Form */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "600px",
        }}
      >
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <input type="date" name="date" value={obj.date} onChange={onChange} style={inputStyle} />
          <input type="time" name="time" value={obj.time} onChange={onChange} style={inputStyle} />
          <input type="text" placeholder="From" name="from" value={obj.from} onChange={onChange} style={inputStyle} />
          <input type="text" placeholder="To" name="to" value={obj.to} onChange={onChange} style={inputStyle} />
          <input type="number" placeholder="Distance (km)" name="distance" value={obj.distance} onChange={onChange} style={inputStyle} />
          <input type="number" placeholder="Amount (Rs)" name="amount" value={obj.amount} onChange={onChange} style={inputStyle} />
          <button type="submit" style={buttonStyle}>
            ADD Today's Log
          </button>
        </form>
      </div>

      {/* Display Data */}
      <div style={{ padding: "20px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth < 600
                ? "1fr"
                : window.innerWidth < 900
                ? "1fr 1fr"
                : "repeat(3, 1fr)",
            gap: "20px",
            width: "90%",
            margin: "auto",
          }}
        >
          {data.map((ele) => (
            <div
              key={ele.id}
              style={{
                textAlign: "center",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: "10px",
                padding: "20px",
                background: "rgba(255,255,255,0.05)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(4px)",
                color: "white",
                fontFamily: "'Segoe UI', sans-serif",
              }}
            >
              <h4 style={{ fontFamily: '"Times New Roman", serif' }}>Date: {ele.date}</h4>
              <p>Time: {ele.time}</p>
              <p>From: {ele.from}</p>
              <p>To: {ele.to}</p>
              <p>Distance: {ele.distance} Km</p>
              <p>Amount: ₹{ele.amount}</p>
              <button
                onClick={() => removeUser(ele.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransportHistory;
