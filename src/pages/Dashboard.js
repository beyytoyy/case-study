import React from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

const Dashboard = () => {
    // Dummy data for charts
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56]
            },
            {
                label: 'Expenses',
                backgroundColor: '#FFA726',
                data: [28, 48, 40, 19, 86]
            }
        ]
    };

    const pieData = {
        labels: ['Electronics', 'Fashion', 'Grocery', 'Home'],
        datasets: [
            {
                data: [300, 50, 100, 80],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A']
            }
        ]
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Profit',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.4
            }
        ]
    };

    const scatterData = {
        datasets: [
            {
                label: 'Scatter Dataset',
                data: [
                    { x: 10, y: 20 },
                    { x: 15, y: 10 },
                    { x: 20, y: 30 },
                    { x: 25, y: 25 },
                    { x: 30, y: 35 }
                ],
                backgroundColor: '#36A2EB', // Default dot color
                pointRadius: 6, // Size of points
                pointHoverRadius: 8 // Size of points on hover
            }
        ]
    };    

    return (
        <div className="grid">
            <div className="col-6">
                <Card title="Bar Chart">
                    <Chart type="bar" data={barData} />
                </Card>
            </div>
            <div className="col-6">
                <Card title="Line Chart">
                    <Chart type="line" data={lineData} />
                </Card>
            </div>
            <div className="col-6">
                <Card title="Pie Chart">
                    <Chart type="pie" data={pieData} />
                </Card>
            </div>
            <div className="col-6">
                <Card title="Doughnut Chart">
                    <Chart type="scatter" data={scatterData} />
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
