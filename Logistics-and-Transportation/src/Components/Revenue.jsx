import React, { useEffect, useState } from "react";
import '../../src/Components/style/Revenue.css'
function Revenue() {
    const [data, setData] = useState([]);
    const [daily, setDaily] = useState(0);
    const [weekly, setWeekly] = useState(0);
    const [monthly, setMonthly] = useState(0);

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
            .filter(item => {
                const itemDate = new Date(item.date);
                return (
                    itemDate.toDateString() === now.toDateString()
                );
            })
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

    return (
        <>
            <div style={{
                height: "100vh",
                backgroundImage: `url(https://images.unsplash.com/photo-1595900604598-4667e6437839?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
            }}>

                <h2>Revenue Summary</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    padding: '10px',
                    height: '10vh',
                    borderRadius: '20px',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)',
                    width: '70vw',
                    margin: '10vh auto',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                                   
                }}
                >


                    <p><strong>Daily Revenue:</strong> {daily} Rs</p>
                    <p><strong>Weekly Revenue:</strong> {weekly} Rs</p>
                    <p><strong>Monthly Revenue:</strong> {monthly} Rs</p>

                </div>
            </div>
        </>
    );
}

export default Revenue;
