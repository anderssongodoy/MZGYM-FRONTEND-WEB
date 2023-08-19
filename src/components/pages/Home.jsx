import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

export const Home = () => {
    const [chartCustomerCreated, setChartCustomerCreated] = useState(false);
    const [chartMembershipCreated, setChartMembershipCreated] = useState(false);

    useEffect(() => {
        if (!chartCustomerCreated) {
            axios.get('https://mzgym2-production.up.railway.app/api/customer/list')
                .then(response => {
                    const data = response.data;
                    const months = Array.from({ length: 12 }, (_, i) => i + 0);
                    const clientsPerMonth = Array(12).fill(0);

                    data.forEach(client => {
                        const createDate = new Date(client.createdDate);
                        const month = createDate.getMonth(); // 0-11
                        clientsPerMonth[month] += 1;
                    });

                    const ctx = document.getElementById('clientesGraph');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: months.map(month => getMonthName(month)),
                            datasets: [{
                                label: 'Clientes por Mes',
                                data: clientsPerMonth,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                    setChartCustomerCreated(true);
                })
                .catch(error => {
                    console.error('Error al obtener la lista de clientes', error);
                });
        }
    }, [chartCustomerCreated]);

    useEffect(() => {
        if (!chartMembershipCreated) {
            axios.get('https://mzgym2-production.up.railway.app/api/membership/list')
                .then(response => {
                    const data = response.data;

                    const membershipCounts = {};
                    data.forEach(membership => {
                        const name = membership.name;
                        if (membershipCounts[name]) {
                            membershipCounts[name] += 1;
                        } else {
                            membershipCounts[name] = 1;
                        }
                    });

                    const ctx = document.getElementById('membresiasGraph');
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: Object.keys(membershipCounts),
                            datasets: [{
                                data: Object.values(membershipCounts),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)',
                                ]
                            }]
                        }
                    });

                    setChartMembershipCreated(true);
                })
                .catch(error => {
                    console.error('Error al obtener la lista de membresías', error);
                });
        }
    }, [chartMembershipCreated]);

    const getMonthName = (monthNumber) => {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[monthNumber];
    };

    return (
        <div>
            <div className="text-primary font-black text-4xl">
                DASHBOARDS
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
            <div>
                <canvas id="clientesGraph" width="400" height="200"></canvas>
            </div>
            <div>
                <canvas id="membresiasGraph" width="400" height="200"></canvas>
            </div>
        </div>
        </div>
    );
};