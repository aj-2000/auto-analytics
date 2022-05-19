import faker from '@faker-js/faker';
import React, { useState, useEffect } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  //Data using API
  


  

  export const LineChart = () => {
    const [result, setResult] = useState([]);
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: result,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

    useEffect(() => {
      async function getQueryOneData(){
        const apiUrl = "http://127.0.0.1:8000/q1/"
        const response = await fetch(apiUrl)
        const barChartData = await response.json();
        const jsData = JSON.parse(barChartData);
        const finalData = Object.values(jsData['Mileage Km/L'])
        console.log(finalData)
        setResult(finalData);
      }
      getQueryOneData();
    },[])
    return (
      <Line options={options} data={data} />
    )
  }
  
