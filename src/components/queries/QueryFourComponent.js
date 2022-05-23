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
import { BASE_URL } from '../../consts/urls';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function QueryFourComponent() {
    
    const [labels, setLabels] = useState([])
    const [series, setSeries] = useState([])

  
    useEffect(() => {
        async function getQueryFourData(){
            const apiUrl = `${BASE_URL}/q4/`
            const response = await fetch(apiUrl,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        
            })
            const data = await response.json();
            const obj = JSON.parse(data);
            setLabels(Object.values(obj.Brand));
            setSeries(Object.values(obj['Percent Change']))
            
          }
          getQueryFourData()

    }, [])
    const options = {
        responsive: true,
        scales: {
            legend: {
                display: false //This will do the task
             },
            yAxes: {
                title: {
                    display: true,
                    text: 'Percent Change',
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
        },
      };
      const data = {
        labels,
        datasets: [
          {
            label:'Percentage Change',
            data: series,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      
  return <Bar options={options} data={data} />;
}
