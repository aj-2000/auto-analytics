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
import { ContactlessOutlined } from '@mui/icons-material';
import { chartColors } from '../../consts/colors';


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
            const objArray = JSON.parse(data);
            setLabels(objArray.map((obj)=>{
              return obj.Brand
            }))
            setSeries(objArray.map((obj)=>{
              return obj['Percent Change']
            }))
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
                    text: 'Percent Change Between 2019 and 2020 Sales',
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
                        size: 20
                    }
                }
            }
        },
        plugins: {
          legend: {
            position: 'top',
            display: false
          },
        },
      };
      const data = {
        labels,
        datasets: [
          {
            label:'Percentage Change',
            data: series,
            backgroundColor: chartColors,
          },
        ],
      };
      
  return <Bar options={options} data={data} />;
}
