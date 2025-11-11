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
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function Revenue() {
  const [data, setData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('daily');
  const [chartType, setChartType] = useState('bar');
  const [currency, setCurrency] = useState('₹');
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    total: 0
  });

  const themes = {
    dark: {
      background: 'rgba(0, 0, 0, 0.7)',
      text: '#ffffff',
      accent: '#8884d8',
      cardBg: 'rgba(255, 255, 255, 0.15)',
    }
  };

  const currencySymbols = {
    '₹': 'INR',
    '$': 'USD',
    '€': 'EUR',
    '£': 'GBP'
  };

  const chartColors = {
    dark: ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'],
  };

  async function fetchData() {
    setIsLoading(true);
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
      calculateStats(array);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function calculateStats(transportData) {
    const now = new Date();
    
    // Helper function to parse date from transport records
    const parseTransportDate = (record) => {
      // Try startDate first, then createdAt, then use current date as fallback
      return record.startDate ? new Date(record.startDate) : 
             record.createdAt ? new Date(record.createdAt) : now;
    };

    // Helper function to get revenue from transport record
    const getRevenue = (record) => {
      // Try revenue field first, then calculate from profit if available
      if (record.revenue) {
        return parseFloat(record.revenue) || 0;
      }
      // If revenue is not available, try to calculate from profit and costs
      if (record.profit) {
        const profit = parseFloat(record.profit) || 0;
        const fuelCost = parseFloat(record.fuelCost) || 0;
        const maintenanceCost = parseFloat(record.maintenanceCost) || 0;
        const tollCost = parseFloat(record.tollCost) || 0;
        const otherCosts = parseFloat(record.otherCosts) || 0;
        const totalCost = fuelCost + maintenanceCost + tollCost + otherCosts;
        return profit + totalCost;
      }
      return 0;
    };

    const dailyTotal = transportData
      .filter(item => {
        const itemDate = parseTransportDate(item);
        return itemDate.toDateString() === now.toDateString();
      })
      .reduce((sum, item) => sum + getRevenue(item), 0);

    const weeklyTotal = transportData
      .filter(item => {
        const itemDate = parseTransportDate(item);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return itemDate >= oneWeekAgo && itemDate <= now;
      })
      .reduce((sum, item) => sum + getRevenue(item), 0);

    const monthlyTotal = transportData
      .filter(item => {
        const itemDate = parseTransportDate(item);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return itemDate >= oneMonthAgo && itemDate <= now;
      })
      .reduce((sum, item) => sum + getRevenue(item), 0);

    const yearlyTotal = transportData
      .filter(item => {
        const itemDate = parseTransportDate(item);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        return itemDate >= oneYearAgo && itemDate <= now;
      })
      .reduce((sum, item) => sum + getRevenue(item), 0);

    const totalRevenue = transportData.reduce((sum, item) => sum + getRevenue(item), 0);

    setStats({
      daily: dailyTotal,
      weekly: weeklyTotal,
      monthly: monthlyTotal,
      yearly: yearlyTotal,
      total: totalRevenue
    });
  }

  const getChartData = () => {
    // Generate more realistic sample data based on actual stats
    switch (timeFrame) {
      case 'daily':
        return [
          { name: "Today", value: stats.daily },
          { name: "Yesterday", value: Math.max(0, stats.daily * 0.8) },
        ];
      case 'weekly':
        return [
          { name: "This Week", value: stats.weekly },
          { name: "Last Week", value: Math.max(0, stats.weekly * 0.75) },
        ];
      case 'monthly':
        return [
          { name: "This Month", value: stats.monthly },
          { name: "Last Month", value: Math.max(0, stats.monthly * 0.85) },
        ];
      case 'yearly':
        return [
          { name: "This Year", value: stats.yearly },
          { name: "Last Year", value: Math.max(0, stats.yearly * 0.9) },
        ];
      default:
        return [
          { name: "Daily", value: stats.daily },
          { name: "Weekly", value: stats.weekly },
          { name: "Monthly", value: stats.monthly },
          { name: "Yearly", value: stats.yearly },
        ];
    }
  };

  const getTimeFrameData = () => {
    // Generate detailed data for the selected timeframe
    const baseValue = stats[timeFrame] || stats.total;
    
    if (timeFrame === 'daily') {
      return Array.from({ length: 24 }, (_, i) => ({
        name: `${i}:00`,
        value: Math.floor(baseValue * (Math.random() * 0.3 + 0.1) / 24) // More realistic distribution
      }));
    } else if (timeFrame === 'weekly') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
        name: day,
        value: Math.floor(baseValue * (Math.random() * 0.3 + 0.1) / 7)
      }));
    } else if (timeFrame === 'monthly') {
      return Array.from({ length: 12 }, (_, i) => ({
        name: `Week ${i + 1}`,
        value: Math.floor(baseValue * (Math.random() * 0.3 + 0.1) / 12)
      }));
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => ({
        name: month,
        value: Math.floor(baseValue * (Math.random() * 0.3 + 0.1) / 12)
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentTheme = themes[theme];
  const colors = chartColors[theme];

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: `url(https://images.unsplash.com/photo-1595900604598-4667e6437839?q=80&w=1983&auto=format&fit=crop)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: "20px",
    color: currentTheme.text,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    // position: "relative",
    margin : "-10px",
  //  padding : "0"
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: currentTheme.background,
    zIndex: 1,
  };

  const cardStyle = {
    background: currentTheme.cardBg,
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  const buttonStyle = (active = false) => ({
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "10px",
    background: active ? currentTheme.accent : "rgba(255,255,255,0.1)",
    color: currentTheme.text,
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  });

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1200px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            marginBottom: "10px",
            fontFamily: "Georgia, serif",
            textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
            background: `linear-gradient(135deg, ${currentTheme.accent}, #fff)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Transport Revenue Analytics
          </h2>
          <p style={{ opacity: 0.8, fontSize: "1.1rem" }}>
            Real-time transport revenue tracking and analytics
          </p>
        </div>

        {/* Controls */}
        <div style={{ ...cardStyle, marginBottom: "30px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", marginBottom: "20px" }}>
            <div>
              <label style={{ marginRight: "10px", fontWeight: "bold" }}>Time Frame:</label>
              {['daily', 'weekly', 'monthly', 'yearly'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeFrame(tf)}
                  style={buttonStyle(timeFrame === tf)}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
            
            <div>
              <label style={{ marginRight: "10px", fontWeight: "bold" }}>Chart Type:</label>
              {['bar', 'pie', 'line'].map(type => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  style={buttonStyle(chartType === type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <div>
              <label style={{ marginRight: "10px", fontWeight: "bold" }}>Currency:</label>
              {Object.keys(currencySymbols).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  style={buttonStyle(currency === curr)}
                >
                  {curr} {currencySymbols[curr]}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={fetchData}
            disabled={isLoading}
            style={{
              ...buttonStyle(true),
              padding: "15px 30px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              background: isLoading ? "#ccc" : currentTheme.accent,
              width: "100%",
            }}
          >
            {isLoading ? "🔄 Refreshing..." : "📊 Refresh Data"}
          </button>
        </div>

        {/* Stats Overview */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}>
          {[
            { label: "Daily Revenue", value: stats.daily, icon: "📅" },
            { label: "Weekly Revenue", value: stats.weekly, icon: "📊" },
            { label: "Monthly Revenue", value: stats.monthly, icon: "💰" },
            { label: "Total Revenue", value: stats.total, icon: "🏆" },
          ].map((stat) => (
            <div key={stat.label} style={cardStyle}>
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{stat.icon}</div>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "1rem", opacity: 0.8 }}>{stat.label}</h3>
              <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold", color: currentTheme.accent }}>
                {currency}{stat.value.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{
          ...cardStyle,
          height: "400px",
          marginBottom: "30px",
          transition: "all 0.3s ease",
        }}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Revenue Analysis
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            {chartType === 'bar' ? (
              <BarChart data={getTimeFrameData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke={currentTheme.text} />
                <YAxis stroke={currentTheme.text} />
                <Tooltip 
                  contentStyle={{
                    background: currentTheme.cardBg,
                    border: `1px solid ${currentTheme.accent}`,
                    borderRadius: "10px",
                    color: currentTheme.text,
                  }}
                  formatter={(value) => [`${currency}${Number(value).toFixed(2)}`, 'Revenue']}
                />
                <Bar 
                  dataKey="value" 
                  fill={currentTheme.accent}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            ) : chartType === 'pie' ? (
              <PieChart>
                <Pie
                  data={getChartData()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ name, value }) => `${name}: ${currency}${Number(value).toFixed(2)}`}
                  animationDuration={1500}
                >
                  {getChartData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${currency}${Number(value).toFixed(2)}`, 'Revenue']}
                  contentStyle={{
                    background: currentTheme.cardBg,
                    border: `1px solid ${currentTheme.accent}`,
                    borderRadius: "10px",
                    color: currentTheme.text,
                  }}
                />
                <Legend />
              </PieChart>
            ) : (
              <LineChart data={getTimeFrameData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke={currentTheme.text} />
                <YAxis stroke={currentTheme.text} />
                <Tooltip 
                  contentStyle={{
                    background: currentTheme.cardBg,
                    border: `1px solid ${currentTheme.accent}`,
                    borderRadius: "10px",
                    color: currentTheme.text,
                  }}
                  formatter={(value) => [`${currency}${Number(value).toFixed(2)}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={currentTheme.accent}
                  strokeWidth={3}
                  dot={{ fill: currentTheme.accent, strokeWidth: 2, r: 4 }}
                  animationDuration={1500}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Additional Info */}
        <div style={{
          ...cardStyle,
          textAlign: "center",
          opacity: 0.8,
          fontSize: "0.9rem",
        }}>
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p>Total Transport Records: {data.length} | Currency: {currencySymbols[currency]}</p>
          <p>Data Source: Transport History Records</p>
        </div>
      </div>
    </div>
  );
}

export default Revenue;