import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function QueryThreeComponent() {
    
    const [labels, setLabels] = useState([])
    const [seriesOne, setSeriesOne] = useState([])
    const [seriesTwo, setSeriesTwo] = useState([])

    
    useEffect(() => {
        async function getQueryThreeData(){
            const apiUrl = `http://127.0.0.1:8000/q3/`
            const response = await fetch(apiUrl,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        
            })
            const data = await response.json();
            const obj = JSON.parse(data);
            setLabels(Object.values(obj.Brand));
            setSeriesOne(Object.values(obj['2019 sales']))
            setSeriesTwo(Object.values(obj['2020 sales']))
          }
          getQueryThreeData()

    }, [])
    const options = {
        responsive: true,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Sales Volume',
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    precision: 0
                }
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Brand',
                    font: {
                        size: 15
                    }
                }
            }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales Comparison of Top 10 Brans in 2019 and 2020',
          },
        },
      };
      const data = {
        labels,
        datasets: [
          {
            label: '2019 Sales',
            data: seriesOne,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: '2020 Sales',
            data: seriesTwo,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
  return <Bar options={options} data={data} />;
}
