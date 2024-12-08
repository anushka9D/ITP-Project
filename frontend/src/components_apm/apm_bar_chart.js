import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function AppointmentBarChart() {

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Number of Appointments',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    });

    useEffect(() => {
    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:8070/appointmentrequest/graph/appointments-by-date');
            const data = response.data;

            if (data && Array.isArray(data)) {
                const labels = data.map(item => item._id); // Dates
                const values = data.map(item => item.count); // Counts

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Number of Appointments',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } else {
                console.error('Invalid data format:', data);
                setChartData({
                    labels: [],
                    datasets: []
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setChartData({
                labels: [],
                datasets: []
            });
        }
    }

    fetchData();
}, []);


return (
    <div className='apm-chart-container-3'>
        <h3>Appointments by Date</h3>
        {chartData.labels.length > 0 ? (
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Dates',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Appointments',
                            },
                            beginAtZero: true,
                        },
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                }}
            />
        ) : (
            <p>No data available</p>
        )}
    </div>
);
}
export default AppointmentBarChart;
