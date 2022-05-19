import { TextField, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
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
const MANUFACTURER_LIST = ['All' ,'Maruti', 'Hyundai', 'Honda', 'Audi', 'Nissan', 'Toyota',
'Volkswagen', 'Tata', 'Land', 'Mitsubishi', 'Renault',
'MercedesBenz', 'BMW', 'Mahindra', 'Ford', 'Porsche', 'Datsun',
'Jaguar', 'Volvo', 'Chevrolet', 'Skoda', 'Mini', 'Fiat', 'Jeep',
'Smart', 'Ambassador', 'Isuzu', 'ISUZU', 'Force', 'Bentley',
'Lamborghini']

const PROPERTIES_LIST = [
    'Name', 'Manufacturer', 'Year',
        'Fuel_Type', 'Transmission', 
       'Engine CC', 'Power', 'Seats', 'Mileage Km/L', 'Price'
]

const FUEL_TYPE_LIST = ['All', 'CNG', 'Diesel', 'Petrol', 'LPG']

const TRANSMISSION_LIST = ['All', 'Manual', 'Automatic']

const ORDER_BY_LIST = ['None', 'Name', 'Manufacturer', 'Year', 'Power', 'Seats', 'Mileage', 'Price']

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
    display: flex;
`


const CompareCars = () => {
    // Table Data
    const [rows, setRows] = useState([]);

    //Filter States
    const [make, setMake] = useState('All');
    const [fuelType, setFuelType] = useState('All');
    const [transmission, setTransmission] = useState('All');
    const [orderBy, setOrderBy] = useState('None');
    const [year, setYear] = useState(0);
    const [mileageKML, setMileageKML] = useState(0);
    const [engineCC, setEngineCC] = useState(0);
    const [power, setPower] = useState(0);
    const [seats, setSeats] = useState(0);
    const [price, setPrice] = useState(0);
    const [numberOfRecords, setNumberOfRecords] = useState(50);


    //Filter Handlers
    const handleMake = (event) => {
        setRows([]);
        setMake(event.target.value);
    };

    const handleFuelType = (event) => {
        setRows([]);
        setFuelType(event.target.value);
    };

    const handleTransmission = (event) => {
        setRows([]);
        setTransmission(event.target.value);
    };

    const handleOrderBy = (event) => {
        setRows([]);
        setOrderBy(event.target.value);
    };

    const handleYear = (event) => {
        setRows([]);
        if(event.target.value){
            setYear(event.target.value)
        } else {
            setYear(0)
        } 
    }
    
    const handleMileageKML = (event) => {
        setRows([]);
        if(event.target.value){
            setMileageKML(event.target.value)
        } else {
            setMileageKML(0)
        }
        
    }

    const handleEngineCC = (event) => {
        setRows([]);
        if(event.target.value){
            setEngineCC(event.target.value)
        } else {
            setEngineCC(0)
        }
    }

    const handlePower = (event) => {
        setRows([]);
        if(event.target.value){
            setPower(event.target.value)
        } else {
            setPower(0)
        }
    }

    const handleSeats = (event) => {
        setRows([]);
        if(event.target.value){
            setSeats(event.target.value)
        } else {
            setSeats(0)
        }
    }
    
    const handlePrice = (event) => {
        setRows([]);
        if(event.target.value){
            setPrice(event.target.value)
        } else {
            setPrice(0)
        }
    }

    const handleNumberOfRecords = (event) => {
        setRows([]);
        if(event.target.value){
            setNumberOfRecords(event.target.value)
        } else {
            setNumberOfRecords(0)
        }
    }
    
    useEffect(() => {
        async function getFilteredCarsData(){
            const apiUrl = `http://127.0.0.1:8000/cars/${make}/${fuelType}/${transmission}/${orderBy}/${year}/${mileageKML}/${engineCC}/${power}/${seats}/${price}/${numberOfRecords}/`
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

    }, [fuelType, orderBy, transmission, make, price, year, mileageKML, engineCC, power, seats, numberOfRecords])
    console.log(rows)
  return (
    <Container>
        <FormControl className='root'>
            {/* //Manufacturer */}
            <InputLabel id="make-select-label">Manufacturer</InputLabel>
            <Select
                labelId="make-select-label"
                id="make"
                value={make}
                label="Manufacturer"
                onChange={handleMake}
            >
                {MANUFACTURER_LIST.map(name => (
                    <MenuItem value={name}>{name}</MenuItem>
                ))}
            </Select>
            {/* //Fuel_Type */}
            <InputLabel id="fuelType-select-label">Fuel_Type</InputLabel>
            <Select
                labelId="fuelType-select-label"
                id="fuelType"
                value={fuelType}
                label="Fuel_Type"
                onChange={handleFuelType}
            >
                {FUEL_TYPE_LIST.map(fuelType => (
                    <MenuItem value={fuelType}>{fuelType}</MenuItem>
                ))}
            </Select>
            {/* //Transmission */}
            <InputLabel id="transmission-select-label">Transmission</InputLabel>
            <Select
                labelId="transmission-select-label"
                id="transmission"
                value={transmission}
                label="Transmission"
                onChange={handleTransmission}
            >
                {TRANSMISSION_LIST.map(transmission => (
                    <MenuItem value={transmission}>{transmission}</MenuItem>
                ))}
            </Select>
            {/* Order by */}
            <InputLabel id="orderBy-select-label">Order By</InputLabel>
            <Select
                labelId="orderBy-select-label"
                id="orderBy"
                value={orderBy}
                label="OrderBy"
                onChange={handleOrderBy}
            >
                {ORDER_BY_LIST.map(orderBy => (
                    <MenuItem value={orderBy}>{orderBy}</MenuItem>
                ))}
            </Select>
            {/* Price >= */}
            <TextField id="outlined-basic" onChange={handlePrice} label="Price >=" variant="outlined" />
            {/* Year >= */}
            <TextField id="outlined-basic" onChange={handleYear} label="Year >=" variant="outlined" />
            {/* Mileage(KM/L) >= */}
            <TextField id="outlined-basic" onChange={handleMileageKML} label="Mileage(KM/L) >=" variant="outlined" />
            {/* Engine(CC) >= */}
            <TextField id="outlined-basic" onChange={handleEngineCC} label="Engine(CC) >=" variant="outlined" />
            {/* Power >= */}
            <TextField id="outlined-basic" onChange={handlePower} label="Power >=" variant="outlined" />
            {/* Seats >= */}
            <TextField id="outlined-basic" onChange={handleSeats} label="Seats >=" variant="outlined" />
            {/* NumberOfRecords >= */}
            <TextField id="outlined-basic" onChange={handleNumberOfRecords} label="Number Of Records" variant="outlined" />


            
</FormControl>

    {/* Table Rendering */}
    <TableContainer component={Paper}>
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