import { TextField, MenuItem, Select, InputLabel, FormControl, Alert} from '@mui/material';
import React, { useEffect,useState } from 'react';
import {default as sty} from 'styled-components' ;
import '../App.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Line, Bar, Pie } from 'react-chartjs-2';
import { Filter } from '@mui/icons-material';

import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux";
import {setMake, setFuelType, setTransmission, setOrderBy, setYear, setMileageKML, setEngineCC, setPower, setSeats, setPrice, setNumberOfRecords} from '../redux/filtersSlice'
import { MANUFACTURER_LIST, PROPERTIES_LIST, Y_DATA_LIST, FUEL_TYPE_LIST, TRANSMISSION_LIST, ORDER_BY_LIST } from '../consts/arrays'
import {Box} from '@mui/material';
import { BASE_URL } from '../consts/urls';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  

const Container = sty.div`
  display:flex;
  flex-direction: column;
`
const Filters = sty.div`
  display:flex;

`

const FilterContainer = sty.div`
  display: flex;
  align-items: center;
  margin:10px;

`
const AlertContainer = sty.div`
  margin: 0 10px 10px 10px;
  
`

const ChartDrawerContainer = sty.div`

  height:67vh;
  width:auto;
`


export const CHART_TYPES = {
    LINE: "line",
    BAR: "bar",
    PIE: "pie"
}

const CompareCars = (value, ...props) => {

    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters)
    const tabs = useSelector((state) => state.tabs)
    const apiUrl = `${BASE_URL}/cars/${filters.make}/${filters.fuelType}/${filters.transmission}/${filters.orderBy}/${filters.year}/${filters.mileageKML}/${filters.engineCC}/${filters.power}/${filters.seats}/${filters.price}/${filters.numberOfRecords}/`
    const dependencyArray = [filters.fuelType, filters.orderBy, filters.transmission, filters.make, filters.price, filters.year, filters.mileageKML, filters.engineCC, filters.power, filters.seats, filters.numberOfRecords];
    const [rows, setRows] = useState([])
    //ChartMakerStates
    //ChartMaker
    const [chartType, setChartType] = useState(CHART_TYPES.LINE);
    const [xTitle, setXTitle] = useState('Name')
    // const [yTitle, setYTitle] = useState('Y Axis')
    const [chartTitle, setChartTitle] = useState('Chart Title')
    const [xDataSet, setXDataSet] = useState([])
    const [yDataSetOne, setYDataSetOne] = useState([])
    const [yDataSetTwo, setYDataSetTwo] = useState([])
    const [yDataSetThree, setYDataSetThree] = useState([])
    const [yDataSetOneLabel, setYDataSetOneLabel] = useState(Y_DATA_LIST[0])
    const [yDataSetTwoLabel, setYDataSetTwoLabel] = useState(Y_DATA_LIST[1])
    const [yDataSetThreeLabel, setYDataSetThreeLabel] = useState(Y_DATA_LIST[2])
    
    const handleChartType = (event, newChartType) => {
        setChartType(newChartType);
    };

    const handleChartTitle = (event) => {
        if(event.target.value){
            setChartTitle(event.target.value)
        } else {
            setChartTitle('Chart Title')
        }
    };

   

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            // legend: {
            //     display: false //This will do the task
            //  },
            y: {
                title: {
                    display: chartType!=CHART_TYPES.PIE,
                },
                ticks: {
                    precision: 10
                }
            },
            x: {
                title: {
                    display: chartType!=CHART_TYPES.PIE,
                    text: xTitle,
                    font:{
                        size:20,
                        
                    }
                },
                ticks: {
                    font: {
                        size: 8,
                    }
                }
            },
            
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: chartTitle,
          },
        },
      };
      const data={
        labels: xDataSet,
        datasets: [
          {
            id: 1,
            label: yDataSetOneLabel,
            data: yDataSetOne,
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
          {
            id: 2,
            label: yDataSetTwoLabel,
            data: yDataSetTwo,
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
          {
            id: 3,
            label: yDataSetThreeLabel,
            data: yDataSetThree,
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



    //Filter Handlers
    const handleMake = (event) => {
        setRows([]);
        dispatch(setMake(event.target.value));
    };

    const handleFuelType = (event) => {
        setRows([]);
        dispatch(setFuelType(event.target.value));
    };

    const handleTransmission = (event) => {
        setRows([]);
        dispatch(setTransmission(event.target.value));
    };

    const handleOrderBy = (event) => {
        setRows([]);
        dispatch(setOrderBy(event.target.value));
    };

    const handleYear = (event) => {
        setRows([]);
        if(event.target.value){
            dispatch(setYear(event.target.value));
        } else {
            dispatch(setYear(event.target.value));
        } 
    }
    
    const handleMileageKML = (event) => {
        setRows([]);
        if(event.target.value){
            dispatch(setMileageKML(event.target.value));
        } else {
            dispatch(setMileageKML(0));
        }
        
    }

    const handleEngineCC = (event) => {
        setRows([]);
        if(event.target.value){
            dispatch(setEngineCC(event.target.value));
        } else {
            dispatch(setEngineCC(0));
        }
    }

    const handlePower = (event) => {
        setRows([]);
        if(event.target.value){
            dispatch(setPower(event.target.value));
        } else {
            dispatch(setPower(0));
        }
    }

    const handleSeats = (event) => {
        setRows([]);
        if(event.target.value){
            dispatch(setSeats(event.target.value));
        } else {
            dispatch(setSeats(event.target.value));
        }
    }
    
    const handlePrice = (event) => {
        setRows([]);
        if(event.target.value){
            dispatch(setPrice(event.target.value));
        } else {
            dispatch(setPrice(0));
        }
    }

    const handleNumberOfRecords = (event) => {
        setRows([]);
        if(event.target.value){
            dispatch(setNumberOfRecords(event.target.value))
        } else {
            dispatch(setNumberOfRecords(0))
        }
    }
   

    useEffect(() => {
        async function getFilteredCarsData(){
            const response = await fetch(apiUrl,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            })
            const tableData = await response.json();
            const obj = JSON.parse(tableData);
            setRows(obj);
          }
          getFilteredCarsData()
    }, dependencyArray)
    console.log('rerender')
    useEffect(()=>{
            const xDataSetTemp = []
            const yDataSetOneTemp = []
            const yDataSetTwoTemp = []
            const yDataSetThreeTemp = []

            rows.map((obj)=> {
                xDataSetTemp.push(obj[xTitle])
                yDataSetOneTemp.push(obj[yDataSetOneLabel])
                yDataSetTwoTemp.push(obj[yDataSetTwoLabel])
                yDataSetThreeTemp.push(obj[yDataSetThreeLabel])
            })
            setXDataSet(xDataSetTemp)
            setYDataSetOne(yDataSetOneTemp)
            setYDataSetTwo(yDataSetTwoTemp)
            setYDataSetThree(yDataSetThreeTemp)

    },[rows, xTitle, yDataSetOneLabel, yDataSetTwoLabel, yDataSetThreeLabel])





    const handleXDataSet = (event) => {
        setXTitle(event.target.value);
    };

    const handleYDataSetOneLabel = (event) => {
        setYDataSetOneLabel(event.target.value);
    };

    const handleYDataSetTwoLabel = (event) => {
        setYDataSetTwoLabel(event.target.value);
    };

    const handleYDataSetThreeLabel = (event) => {
        setYDataSetThreeLabel(event.target.value);
    };

    

  return (
    <Container>
        <Filters>
        <FilterContainer>
        <FormControl className='select-customize'>
            {/* //Manufacturer */}
            <InputLabel id="make-select-label">Manufacturer</InputLabel>
            <Select
                labelId="make-select-label"
                id="make"
                value={filters.make}
                label="Manufacturer"
                onChange={handleMake}
            >
                {MANUFACTURER_LIST.map(name => (
                    <MenuItem value={name}>{name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>
        <FilterContainer>
        <FormControl>
            {/* //Fuel_Type */}
            <InputLabel id="fuelType-select-label">Fuel_Type</InputLabel>
            <Select
                labelId="fuelType-select-label"
                id="fuelType"
                value={filters.fuelType}
                label="Fuel_Type"
                onChange={handleFuelType}
            >
                {FUEL_TYPE_LIST.map(fuelType => (
                    <MenuItem value={fuelType}>{fuelType}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>

        <FilterContainer>
        <FormControl>
            {/* //Transmission */}
            <InputLabel id="transmission-select-label">Transmission</InputLabel>
            <Select
                labelId="transmission-select-label"
                id="transmission"
                value={filters.transmission}
                label="Transmission"
                onChange={handleTransmission}
            >
                {TRANSMISSION_LIST.map(transmission => (
                    <MenuItem value={transmission}>{transmission}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>
        
        <FilterContainer>
        <FormControl>
            {/* Order by */}
            <InputLabel id="orderBy-select-label">Order By</InputLabel>
            <Select
                labelId="orderBy-select-label"
                id="orderBy"
                value={filters.orderBy}
                label="OrderBy"
                onChange={handleOrderBy}
            >
                {ORDER_BY_LIST.map(orderBy => (
                    <MenuItem value={orderBy}>{orderBy}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>

        <FilterContainer>
                {/* Price >= */}
            <TextField id="outlined-basic" onChange={handlePrice} label="Price >=" variant="outlined" />
        </FilterContainer>
        <FilterContainer>
                {/* Year >= */}
            <TextField id="outlined-basic" onChange={handleYear} label="Year >=" variant="outlined" />
        </FilterContainer>

        <FilterContainer>
                {/* Mileage(KM/L) >= */}
            <TextField id="outlined-basic" onChange={handleMileageKML} label="Mileage(KM/L) >=" variant="outlined" />

        </FilterContainer>

        <FilterContainer>
                {/* Engine(CC) >= */}
            <TextField id="outlined-basic" onChange={handleEngineCC} label="Engine(CC) >=" variant="outlined" />
        </FilterContainer>

        <FilterContainer>
                {/* Power >= */}
            <TextField id="outlined-basic" onChange={handlePower} label="Power >=" variant="outlined" />

        </FilterContainer>

        <FilterContainer>
            {/* Seats >= */}
            <TextField id="outlined-basic" onChange={handleSeats} label="Seats >=" variant="outlined" />

        </FilterContainer>

        <FilterContainer>
            {/* NumberOfRecords >= */}
            <TextField id="outlined-basic" defaultValue={filters.numberOfRecords} onChange={handleNumberOfRecords} label="Max Records" variant="outlined" />      
        </FilterContainer>
        </Filters>
        
        <AlertContainer>
            {/* Alert */}
        <Alert severity="info">Displaying {rows.length} records.</Alert>
        </AlertContainer>
        



            




    {/* Data Visualizer */}
    <Box sx={{display:tabs.displayCharts}}>
    <Filters>
        <FilterContainer>
            <ToggleButtonGroup
                color="primary"
                value={chartType}
                exclusive
                onChange={handleChartType}
            >
            <ToggleButton value={CHART_TYPES.LINE}>LINE</ToggleButton>
            <ToggleButton value={CHART_TYPES.BAR}>BAR</ToggleButton>
            <ToggleButton value={CHART_TYPES.PIE}>PIE</ToggleButton>
    </ToggleButtonGroup>
        </FilterContainer>
        <FilterContainer>
                {/*Chart Title */}
            <TextField id="outlined-basic" onChange={handleChartTitle} label="Chart Title" variant="outlined" />
        </FilterContainer>

        <FilterContainer>
        <FormControl className='select-customize'>
            {/*Select Xaxis Data Set */}
            <InputLabel id="make-select-label">X-AXIS DATA</InputLabel>
            <Select
                labelId="xaxis-data-select-label"
                id="xaxis-data"
                value={xTitle}
                label="Manufacturer"
                onChange={handleXDataSet}
            >
                {PROPERTIES_LIST.map(itm => (
                    <MenuItem value={itm}>{itm}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>

        <FilterContainer>
        <FormControl className='select-customize'>
            {/*Select Yaxis data set one */}
            <InputLabel id="dataset-one-select-label">DATASET 1</InputLabel>
            <Select
                labelId="dataset-one-select-label"
                id="dataset-one"
                value={yDataSetOneLabel}
                label="DATASET 1"
                onChange={handleYDataSetOneLabel}
            >
                {Y_DATA_LIST.map(itm => (
                    <MenuItem value={itm}>{itm}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>

        <FilterContainer>
        <FormControl className='select-customize'>
            {/*Select Yaxis data se 2 */}
            <InputLabel id="dataset-two-select-label">DATASET 2</InputLabel>
            <Select
                labelId="dataset-two-select-label"
                id="dataset-two"
                value={yDataSetTwoLabel}
                label="DATASET 2"
                onChange={handleYDataSetTwoLabel}
            >
                {Y_DATA_LIST.map(itm => (
                    <MenuItem value={itm}>{itm}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>

        <FilterContainer>
        <FormControl className='select-customize'>
            {/*Select Yaxis data se 3 */}
            <InputLabel id="dataset-three-select-label">DATASET 3</InputLabel>
            <Select
                labelId="dataset-three-select-label"
                id="dataset-three"
                value={yDataSetThreeLabel}
                label="DATASET 3"
                onChange={handleYDataSetThreeLabel}
            >
                {Y_DATA_LIST.map(itm => (
                    <MenuItem value={itm}>{itm}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </FilterContainer>
    </Filters>
    <ChartDrawerContainer>
        {chartType==CHART_TYPES.LINE && <Line options={options} data={data}/>}
        {chartType==CHART_TYPES.BAR && <Bar options={options} data={data} />}
        {chartType==CHART_TYPES.PIE && <Pie options={options} data={data} />}
    </ChartDrawerContainer>
    </Box>

            

            

    {/* Table Rendering  */}
    <TableContainer sx={{display: tabs['displayRecords']}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center" > Name </StyledTableCell>
            <StyledTableCell align="center" > Manufacturer </StyledTableCell>
            <StyledTableCell align="center" > Year </StyledTableCell>
            <StyledTableCell align="center" > Fuel Type </StyledTableCell>
            <StyledTableCell align="center" > Transmission </StyledTableCell>
            <StyledTableCell align="center" > Engine CC </StyledTableCell>
            <StyledTableCell align="center" > Power </StyledTableCell>
            <StyledTableCell align="center" > Seats </StyledTableCell>
            <StyledTableCell align="center" > Mileage(KM/L) </StyledTableCell>
            <StyledTableCell align="center" > Price </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.Name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.Manufacturer}</StyledTableCell>
              <StyledTableCell align="right">{row.Year}</StyledTableCell>
              <StyledTableCell align="right">{row.Fuel_Type}</StyledTableCell>
              <StyledTableCell align="right">{row.Transmission}</StyledTableCell>
              <StyledTableCell align="right">{row['Engine CC']}</StyledTableCell>
              <StyledTableCell align="right">{row.Power}</StyledTableCell>
              <StyledTableCell align="right">{row.Seats}</StyledTableCell>
              <StyledTableCell align="right">{row['Mileage Km/L']}</StyledTableCell>
              <StyledTableCell align="right">{row.Price}</StyledTableCell>
            </StyledTableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>

    


        
    </Container>
  )
}

export default CompareCars