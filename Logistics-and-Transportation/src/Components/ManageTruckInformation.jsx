import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageTruckInformation() {
  const [data, setData] = useState([]);
  const [obj, setObj] = useState({
    company: "",
    model_no: "",
    passing_date: "",
    insurance: "",
    puc: "",
    number: ""
  });
  let navigate = useNavigate();

  async function fetchData() {
    try {
      let response = await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist.json');
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
      await fetch('https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setObj(prev => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    addData();
  }

  async function removeUser(id) {
    try {
      await fetch(`https://react-auth-2daa2-default-rtdb.asia-southeast1.firebasedatabase.app/trucklist/${id}.json`, {
        method: 'DELETE'
      });
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
    padding: '10px',
    fontSize: window.innerWidth < 768 ? '14px' : '16px',
    width: window.innerWidth < 768 ? '90%' : '400px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontFamily: '"Segoe UI", sans-serif'
  };

  return (
    <>
      <div
        style={{
          minHeight: "150vh",
          backgroundImage: `url(https://images.unsplash.com/photo-1671190365057-b9a8f79d306f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h2 style={{ textAlign: 'center', padding: '20px', color: '#fff' }}>Manage Truck Information</h2>

        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#000",
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
          padding: '20px'
        }}>
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input type="text" placeholder="Enter Company Name" value={obj.company} name="company" onChange={onChange} style={inputStyle} />
            <input type="number" placeholder="Enter Model No" value={obj.model_no} name="model_no" onChange={onChange} style={inputStyle} />
            <input type="number" placeholder="Enter Passing Date" value={obj.passing_date} name="passing_date" onChange={onChange} style={inputStyle} />
            <input type="text" placeholder="Enter Insurance Expiry Date" value={obj.insurance} name="insurance" onChange={onChange} style={inputStyle} />
            <input type="text" placeholder="Enter PUC Expiry Date" value={obj.puc} name="puc" onChange={onChange} style={inputStyle} />
            <input type="text" placeholder="Enter Passing Number" value={obj.number} name="number" onChange={onChange} style={inputStyle} />
            <button type="submit" style={{
              padding: '10px 20px',
              backgroundColor: '#0984e3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '10px'
            }}>
              Add New Truck
            </button>
          </form>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
          gap: '10px',
          padding: '10px',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)',
          width: '90vw',
          margin: 'auto',
          border: '2px solid rgba(255, 255, 255, 0.1)'
        }}>
          {data && data.map((ele) => (
            <div key={ele.id} style={{
                lineHeight : '5vh',
              textAlign: 'center',
              border: '3px solid rgb(237, 232, 232)',
              borderRadius: '10px',
              padding: '20px',
              margin: '10px',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              width: '90%',
              minHeight: '35vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }}>
              <h4 style={{ fontFamily: '"Times New Roman", serif', fontSize: '18px' }}>Passing No: {ele.number}</h4>
              <p>Insurance: {ele.insurance}</p>
              <p>Passing Date: {ele.passing_date}</p>
              <p>Model No: {ele.model_no}</p>
              <p>Company: {ele.company}</p>
              <button onClick={() => removeUser(ele.id)} style={{ padding: '10px', width: '50%', marginTop: '10px', backgroundColor: '#d63031', color: '#fff', border: 'none', borderRadius: '5px' }}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageTruckInformation;
