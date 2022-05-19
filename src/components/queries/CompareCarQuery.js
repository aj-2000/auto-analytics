import * as React from 'react';
import {useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


export default function QueryTwoComponent() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        async function getQueryTwoData(){
            const apiUrl = `http://127.0.0.1:8000/cars/` + {}
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
          getQueryTwoData()

    }, [])
    console.log(rows)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Brand</StyledTableCell>
            <StyledTableCell align="center">Avg Price in USD</StyledTableCell>
            <StyledTableCell align="right">Auto Group</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.Brand}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.Brand}
              </StyledTableCell>
              <StyledTableCell align="center">{row['Avg Price']}</StyledTableCell>
              <StyledTableCell align="right">{row.Autogroup}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
