import React, {useState, useEffect} from 'react';
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
import Button from '@mui/material/Button';
import { Line } from 'react-chartjs-2';
import {MONTHS_LIST} from '../../consts/arrays'
import { Stack, Grid, Chip, Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ModalTitle = styled.p`
  text-align: center;
`
const Subtitle = styled.p`

`
const ModalItem = styled.div`

`
const Month = styled.div`

`
const InfoContainer = styled.div`
`


export function QuerySevenComponent() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
    const [labels, setLabels] = useState([])
    const [economy, setEconomy] = useState([])
    const [luxury, setLuxury] = useState([])
    const [midRange, setMidRange] = useState([])
    const [ultraLuxury, setUltraLuxury] = useState([])
    const [economySMA, setEconomySMA] = useState([])
    const [luxurySMA, setLuxurySMA] = useState([])
    const [midRangeSMA, setMidRangeSMA] = useState([])
    const [ultraLuxurySMA, setUltraLuxurySMA] = useState([])
    const [economyDiff, setEconomyDiff] = useState([])
    const [luxuryDiff, setLuxuryDiff] = useState([])
    const [midRangeDiff, setMidRangeDiff] = useState([])
    const [ultraLuxuryDiff, setUltraLuxuryDiff] = useState([])
    const [monthsPrediction, setMonthsPrediction] = useState([])

    
    useEffect(() => {
        async function getQuerySevenData(){
            const apiUrlOne = `http://127.0.0.1:8000/q7/1`
            const apiUrlTwo = `http://127.0.0.1:8000/q7/2`
            const responseOne = await fetch(apiUrlOne,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        
            })
            const responseTwo = await fetch(apiUrlTwo,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        
            })
            const dataOne = await responseOne.json();
            const dataTwo = await responseTwo.json();
            const objOne = JSON.parse(dataOne);
            const objTwo = JSON.parse(dataTwo);
            setLabels(MONTHS_LIST);
            setEconomy(Object.values(objOne[0]))
            setLuxury(Object.values(objOne[1]))
            setMidRange(Object.values(objOne[2]))
            setUltraLuxury(Object.values(objOne[3]))
            setEconomySMA(Object.values(objOne[4]))
            setLuxurySMA(Object.values(objOne[5]))
            setMidRangeSMA(Object.values(objOne[6]))
            setUltraLuxurySMA(Object.values(objOne[7]))
            setEconomyDiff(Object.values(objOne[8]))
            setLuxuryDiff(Object.values(objOne[9]))
            setMidRangeDiff(Object.values(objOne[10]))
            setUltraLuxuryDiff(Object.values(objOne[11]))
            setMonthsPrediction(objTwo)
          }
          getQuerySevenData()

    }, [])
    const options = {
        responsive: true,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Sales',
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
                    text: 'Month',
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
            label: 'Economy',
            data: economy,
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Luxury',
            data: luxury,
            backgroundColor: 'rgba(54, 162, 235, 1)',
          },
          {
            label: 'Mid Range',
            data: midRange,
            backgroundColor: 'rgba(255, 206, 86, 1)',
          },
          {
            label: 'Ultra Luxury',
            data: ultraLuxury,
            backgroundColor: 'rgba(75, 192, 192, 1)',
          },
          {
            label: 'Economy SMA',
            data: economySMA,
            borderDash: [10,5],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Luxury SMA',
            data: luxurySMA,
            borderDash: [10,5],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          {
            label: 'Mid Range SMA',
            data: midRangeSMA,
            borderDash: [10,5],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
          },
          {
            label: 'Ultra Luxury SMA',
            data: ultraLuxurySMA,
            borderDash: [10,5],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            type:'bar',
            label: 'Economy-EconomySMA',
            data: economyDiff,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
          },
          {
            type:'bar',
            label: 'Luxury-LuxurySMA',
            data: luxuryDiff,
  
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
          },
          {
            type:'bar',
            label: 'MidRange-MidRangeSMA',
            data: midRangeDiff,
            backgroundColor: 'rgba(255, 206, 86, 0.8)',
          },
          {
            type:'bar',
            label: 'UltraLuxury-UltraLuxurySMA',
            data: ultraLuxuryDiff,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
          },
        ],
      };
      
  return (
    <Box>
      <Box sx={{display:"flex", justifyContent:"center"}}>
      <Button onClick={handleOpen}>View Predctions and Deciding Criteria</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InfoContainer>
            Criteria:<br/>
            1. Months sales should be above simple moving average.<br/>
            2. Months with larger difference from simple moving average are preferred.
          </InfoContainer>
          <ModalTitle>
            Predctions For 
          </ModalTitle>
          <ModalItem>
          <Subtitle>
            Economy
          </Subtitle>
          <Month>{monthsPrediction[0]}</Month>
          <Month>{monthsPrediction[1]}</Month>
          <Month>{monthsPrediction[2]}</Month>
          </ModalItem>
          <ModalItem>
          <Subtitle>
            Luxury
          </Subtitle>
          <Month>{monthsPrediction[3]}</Month>
          <Month>{monthsPrediction[4]}</Month>
          <Month>{monthsPrediction[5]}</Month>
          </ModalItem>
          <ModalItem>
          <Subtitle>
            Mid Range
          </Subtitle>
          <Month>{monthsPrediction[6]}</Month>
          <Month>{monthsPrediction[7]}</Month>
          <Month>{monthsPrediction[8]}</Month>
          </ModalItem>
          <ModalItem>
          <Subtitle>
            Ultra Luxury
          </Subtitle>
          <Month>{monthsPrediction[9]}</Month>
          <Month>{monthsPrediction[10]}</Month>
          <Month>{monthsPrediction[11]}</Month>
          </ModalItem>
          
        </Box>
      </Modal>
      </Box>

      
      <Line options={options} data={data}/>
    </Box>
    
  )
}