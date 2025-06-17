import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Revenue() {
  const [data, setData] = useState([]);
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [clicked, setClicked] = useState(false);

  async function fetchData() {
    try {
      const response = await fetch(
        'https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/history.json'
      );
      const result = await response.json();
      const array = [];
      for (let key in result) {
        array.push({ id: key, ...result[key] });
      }
      setData(array);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const now = new Date();

    const dailyTotal = data
      .filter(item => new Date(item.date).toDateString() === now.toDateString())
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const weeklyTotal = data
      .filter(item => {
        const itemDate = new Date(item.date);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return itemDate >= oneWeekAgo && itemDate <= now;
      })
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const monthlyTotal = data
      .filter(item => {
        const itemDate = new Date(item.date);
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(now.getDate() - 30);
        return itemDate >= oneMonthAgo && itemDate <= now;
      })
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    setDaily(dailyTotal);
    setWeekly(weeklyTotal);
    setMonthly(monthlyTotal);
  }, [data]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    fetchData();
  };

  const chartData = [
    { name: "Daily", value: daily },
    { name: "Weekly", value: weekly },
    { name: "Monthly", value: monthly },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(https://images.unsplash.com/photo-1595900604598-4667e6437839?q=80&w=1983&auto=format&fit=crop)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{
        fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
        marginBottom: "20px",
        textAlign: "center",
        fontFamily: "Georgia, serif",
        textShadow: "1px 1px 4px black"
      }}>
        Revenue Summary
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          width: "90%",
          maxWidth: "800px",
          padding: "20px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.1rem" }}><strong>Daily Revenue:</strong> ₹{daily}</p>
        <p style={{ fontSize: "1.1rem" }}><strong>Weekly Revenue:</strong> ₹{weekly}</p>
        <p style={{ fontSize: "1.1rem" }}><strong>Monthly Revenue:</strong> ₹{monthly}</p>
      </div>

      <button
        onClick={handleClick}
        style={{
          marginTop: "30px",
          padding: "12px 30px",
          fontSize: "1rem",
          fontWeight: "bold",
          background: clicked ? "#4CAF50" : "rgba(255, 255, 255, 0.15)",
          color: "white",
          border: "2px solid white",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: clicked ? "scale(1.1)" : "scale(1)",
          boxShadow: clicked ? "0 0 12px rgba(76, 175, 80, 0.8)" : "0 0 8px rgba(255, 255, 255, 0.3)"
        }}
      >
        Refresh Revenue
      </button>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          gap: "40px"
        }}
      >
        {/* Bar Chart */}
        <div style={{
          width: "100%",
          height: 300,
          background: "rgba(255, 255, 255, 0.2)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease",
        }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" barSize={50} animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{
          width: "100%",
          height: 300,
          background: "rgba(255, 255, 255, 0.2)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease",
        }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Revenue;
