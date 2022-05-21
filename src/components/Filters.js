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
const Container = sty.div`
  display:flex;
  flex-direction: column;
`
const FiltersContainer = sty.div`
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

const Filters = (rows, setRows,...props) => {
    
    const dispatch = useDispatch()
    const filters = useSelector((state) => state.filters)

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
  return (
    <Container>
        <FiltersContainer>
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
        </FiltersContainer>
        
        <AlertContainer>
            {/* Alert */}
        <Alert severity="info">Displaying {rows.length} records.</Alert>
        </AlertContainer>
        </Container>
  )
}

export default Filters