import React,  { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);




export function PieChart() {
    const [result, setResult] = useState([]);
    useEffect(() => {
      async function getQueryOneData(){
        const apiUrl = "http://127.0.0.1:8000/q1/"
        const response = await fetch(apiUrl)
        const barChartData = await response.json();
        const jsData = JSON.parse(barChartData);
        const finalData = Object.values(jsData.Price)
        console.log(finalData)
        setResult(finalData);
      }
      getQueryOneData();
    },[])

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: result.map((itm) => {
              return itm;
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return <Pie data={data} />;
}

