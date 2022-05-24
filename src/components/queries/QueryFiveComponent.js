import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Pie } from 'react-chartjs-2';
import { BASE_URL } from '../../consts/urls';


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const tabs = ['Cars Production(Million)', 'Cars Sales(Million)', 'Cars Exports(Billion USD)']


const QueryFiveComponent = () => {
  const [value, setValue] = useState(0);
  const [series, setSeries] = useState([])
  const [labels, setLabels] = useState([])

 
  const data = {
  labels: labels,
  datasets: [
    {
      label: tabs[value],
      data: series,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
          'rgba(3, 62, 62, 1)',
          'rgba(41, 52, 98, 1)'

      ],
      borderWidth: 1,
    },
  ],
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getQueryFiveData(){
        const apiUrl = `${BASE_URL}/q5/${value}`
        const response = await fetch(apiUrl,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    
        })
        const data = await response.json();
        const obj = JSON.parse(data);
        console.log(obj);
        setLabels(Object.values(obj['Country']))
        setSeries( Object.values(obj[tabs[value]]) );
      }
      getQueryFiveData()

  }, [value])
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered

      >
        <Tab label="Production(M UNITS)" />
        <Tab label="Sales(M UNITS)" />
        <Tab label="Exports(B USD)" />
      </Tabs>
    <Pie data={data} />;
    </Box>
  )
}

export default QueryFiveComponent