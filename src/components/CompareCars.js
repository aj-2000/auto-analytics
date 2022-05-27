import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { default as sty } from "styled-components";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import { Line, Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setMake,
  setFuelType,
  setTransmission,
  setOrderBy,
  setYear,
  setMileageKML,
  setEngineCC,
  setPower,
  setSeats,
  setPrice,
  setNumberOfRecords,
} from "../redux/filtersSlice";
import {
  MANUFACTURER_LIST,
  PROPERTIES_LIST,
  Y_DATA_LIST,
  FUEL_TYPE_LIST,
  TRANSMISSION_LIST,
  ORDER_BY_LIST,
} from "../consts/arrays";
import { Box } from "@mui/material";
import { BASE_URL } from "../consts/urls";
import { chartColors, chartColorsV2 } from "../consts/colors";
import { viewCharts } from "../redux/tabsSlice";

//Reponsible for table design
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));




const CHART_TYPES = {
  LINE: "line",
  BAR: "bar",
};

const CompareCars = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const tabs = useSelector((state) => state.tabs);
  const apiUrl = `${BASE_URL}/cars/${filters.make}/${filters.fuelType}/${filters.transmission}/${filters.orderBy}/${filters.year}/${filters.mileageKML}/${filters.engineCC}/${filters.power}/${filters.seats}/${filters.price}/${filters.numberOfRecords}/`;
  const dependencyArray = [
    filters.fuelType,
    filters.orderBy,
    filters.transmission,
    filters.make,
    filters.price,
    filters.year,
    filters.mileageKML,
    filters.engineCC,
    filters.power,
    filters.seats,
    filters.numberOfRecords,
  ];
  const [rows, setRows] = useState([]);
  //ChartMakerStates
  //ChartMaker
  const [chartType, setChartType] = useState(CHART_TYPES.LINE);
  const [xTitle, setXTitle] = useState("Name");
  const [chartTitle, setChartTitle] = useState("Chart Title");
  const [xDataSet, setXDataSet] = useState([]);
  const [yDataSetOne, setYDataSetOne] = useState([]);
  const [yDataSetTwo, setYDataSetTwo] = useState([]);
  const [yDataSetOneLabel, setYDataSetOneLabel] = useState(Y_DATA_LIST[0]);
  const [yDataSetTwoLabel, setYDataSetTwoLabel] = useState(Y_DATA_LIST[1]);
  const handleChartType = (event, newChartType) => {
    setChartType(newChartType);
  };

  const handleChartTitle = (event) => {
    if (event.target.value) {
      setChartTitle(event.target.value);
      console.log(event.target.value);
    } else {
      setChartTitle("Chart Title");
    }
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: yDataSetOneLabel,
          font: {
            size: 20,
          },
        },
        ticks: {
          precision: 0,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: yDataSetTwoLabel,
          font: {
            size: 20,
          },
        },
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const data = {
    labels: xDataSet,
    datasets: [
      {
        id: 1,
        label: yDataSetOneLabel,
        data: yDataSetOne,
        borderColor: chartColorsV2[0],
        backgroundColor: chartColors[0],
        borderWidth: 2,
        yAxisID: "y",
      },
      {
        id: 2,
        label: yDataSetTwoLabel,
        data: yDataSetTwo,
        borderColor: chartColorsV2[1],
        backgroundColor: chartColors[1],
        borderWidth: 2,
        yAxisID: "y1",
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
    if (event.target.value) {
      dispatch(setYear(event.target.value));
    } else {
      dispatch(setYear(event.target.value));
    }
  };

  const handleMileageKML = (event) => {
    setRows([]);
    if (event.target.value) {
      dispatch(setMileageKML(event.target.value));
    } else {
      dispatch(setMileageKML(0));
    }
  };

  const handleEngineCC = (event) => {
    setRows([]);
    if (event.target.value) {
      dispatch(setEngineCC(event.target.value));
    } else {
      dispatch(setEngineCC(0));
    }
  };

  const handlePower = (event) => {
    setRows([]);
    if (event.target.value) {
      dispatch(setPower(event.target.value));
    } else {
      dispatch(setPower(0));
    }
  };

  const handleSeats = (event) => {
    setRows([]);
    if (event.target.value) {
      dispatch(setSeats(event.target.value));
    } else {
      dispatch(setSeats(event.target.value));
    }
  };

  const handlePrice = (event) => {
    setRows([]);
    if (event.target.value) {
      dispatch(setPrice(event.target.value));
    } else {
      dispatch(setPrice(0));
    }
  };

  const handleNumberOfRecords = (event) => {
    setRows([]);
    if (event.target.value) {
      dispatch(setNumberOfRecords(event.target.value));
    } else {
      dispatch(setNumberOfRecords(0));
    }
  };

  useEffect(() => {
    //fix: synchorization of states between toggle component and redux store tabs 
     dispatch(viewCharts());
    //
    async function getFilteredCarsData() {
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const tableData = await response.json();
      const obj = JSON.parse(tableData);
      setRows(obj);
    }
    getFilteredCarsData();
  }, dependencyArray);
  useEffect(() => {
    setXDataSet(
      rows.map((obj) => {
        return obj[xTitle];
      })
    );
    setYDataSetOne(
      rows.map((obj) => {
        return obj[yDataSetOneLabel];
      })
    );
    setYDataSetTwo(
      rows.map((obj) => {
        return obj[yDataSetTwoLabel];
      })
    );
  }, [rows, xTitle, yDataSetOneLabel, yDataSetTwoLabel]);

  const handleXDataSet = (event) => {
    setXTitle(event.target.value);
  };

  const handleYDataSetOneLabel = (event) => {
    setYDataSetOneLabel(event.target.value);
  };

  const handleYDataSetTwoLabel = (event) => {
    setYDataSetTwoLabel(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} lg={3}>
        <FormControl fullWidth>
            {/* //Manufacturer */}
            <InputLabel id="make-select-label">Manufacturer</InputLabel>
            <Select
            fullWidth
              labelId="make-select-label"
              id="make"
              value={filters.make}
              label="Manufacturer"
              onChange={handleMake}
            >
              {MANUFACTURER_LIST.map((name) => (
                <MenuItem value={name} key={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={6} lg={3}>
        <FormControl fullWidth>
            {/* //Fuel_Type */}
            <InputLabel id="fuelType-select-label">Fuel_Type</InputLabel>
            <Select
              labelId="fuelType-select-label"
              id="fuelType"
              value={filters.fuelType}
              label="Fuel_Type"
              onChange={handleFuelType}
            >
              {FUEL_TYPE_LIST.map((fuelType) => (
                <MenuItem value={fuelType} key={fuelType}>
                  {fuelType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </Grid>
        <Grid item xs={6} lg={3}>
        <FormControl fullWidth>
            {/* //Transmission */}
            <InputLabel id="transmission-select-label">Transmission</InputLabel>
            <Select
              labelId="transmission-select-label"
              id="transmission"
              value={filters.transmission}
              label="Transmission"
              onChange={handleTransmission}
            >
              {TRANSMISSION_LIST.map((transmission) => (
                <MenuItem value={transmission} key={transmission}>
                  {transmission}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </Grid>
        <Grid item xs={6} lg={3}>
        <FormControl fullWidth>
            {/* Order by */}
            <InputLabel id="orderBy-select-label">Order By</InputLabel>
            <Select
              labelId="orderBy-select-label"
              id="orderBy"
              value={filters.orderBy}
              label="OrderBy"
              onChange={handleOrderBy}
            >
              {ORDER_BY_LIST.map((orderBy) => (
                <MenuItem value={orderBy} key={orderBy}>
                  {orderBy}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </Grid>
        <Grid item xs={6} lg={2}>
           {/* Price >= */}
           <TextField
           fullWidth
            id="outlined-basic"
            onChange={handlePrice}
            label="Price >="
            variant="outlined"
          />
          
        </Grid>
        <Grid item xs={6} lg={2}>
          {/* Year >= */}
          <TextField
          fullWidth
            id="outlined-basic"
            onChange={handleYear}
            label="Year >="
            variant="outlined"
          />
          
        </Grid>
        <Grid item xs={6} lg={2}>
          {/* Mileage(KM/L) >= */}
          <TextField
          fullWidth
            id="outlined-basic"
            onChange={handleMileageKML}
            label="Mileage(KM/L) >="
            variant="outlined"
          />
          
        </Grid>
        <Grid item xs={6} lg={2}>
          {/* Engine(CC) >= */}
          <TextField
          fullWidth
            id="outlined-basic"
            onChange={handleEngineCC}
            label="Engine(CC) >="
            variant="outlined"
          />
          
        </Grid>
        <Grid item xs={6} lg={2}> 
          {/* Power >= */}
          <TextField
          fullWidth
            id="outlined-basic"
            onChange={handlePower}
            label="Power >="
            variant="outlined"
          />
          
        </Grid>
        <Grid item xs={6} lg={2}>
           {/* Seats >= */}
           <TextField
           fullWidth
            id="outlined-basic"
            onChange={handleSeats}
            label="Seats >="
            variant="outlined"
          />
          
        </Grid>
        <Grid item xs={12} lg={12}>
          {/* NumberOfRecords >= */}
          <TextField
            fullWidth
            id="outlined-basic"
            defaultValue={filters.numberOfRecords}
            onChange={handleNumberOfRecords}
            label="Max Records"
            variant="outlined"
          />
          
        </Grid>
        <Grid item xs={12}>
           {/* Alert */}
        {rows.length === 0 && (
          <Alert severity="info">
            <b>No matching records found.</b>
          </Alert>
        )}
        {rows.length !== 0 && (
          <Alert severity="info">
            <b>{rows.length} records found.</b> <br />{" "}
            <i>Set Max Records to 0 to view all matching records.</i>
          </Alert>
        )}
          
        </Grid>
        <Grid item xs={12}>
        <ToggleButtonGroup
            fullWidth
              color="primary"
              value={chartType}
              exclusive
              onChange={handleChartType}
            >
              <ToggleButton value={CHART_TYPES.LINE}>LINE</ToggleButton>
              <ToggleButton value={CHART_TYPES.BAR}>BAR</ToggleButton>
              {/* <ToggleButton value={CHART_TYPES.PIE}>PIE</ToggleButton> */}
            </ToggleButtonGroup>
          
        </Grid>
        <Grid item xs={12}>
          {/*Chart Title */}
          <TextField
            fullWidth
              id="outlined-basic"
              onChange={handleChartTitle}
              label="Chart Title"
              variant="outlined"
            />
          
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth >
              {/*Select Xaxis Data Set */}
              <InputLabel id="make-select-label">X-AXIS DATA</InputLabel>
              <Select
                labelId="xaxis-data-select-label"
                id="xaxis-data"
                value={xTitle}
                label="Manufacturer"
                onChange={handleXDataSet}
              >
                {PROPERTIES_LIST.map((itm) => (
                  <MenuItem value={itm} key={itm}>
                    {itm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth>
              {/*Select Yaxis data set one */}
              <InputLabel id="dataset-one-select-label">DATASET 1</InputLabel>
              <Select
                labelId="dataset-one-select-label"
                id="dataset-one"
                value={yDataSetOneLabel}
                label="DATASET 1"
                onChange={handleYDataSetOneLabel}
              >
                {Y_DATA_LIST.map((itm) => (
                  <MenuItem value={itm} key={itm}>
                    {itm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        </Grid>
        

        <Grid item  xs={4}>
        <FormControl fullWidth>
              {/*Select Yaxis data se 2 */}
              <InputLabel id="dataset-two-select-label">DATASET 2</InputLabel>
              <Select
                labelId="dataset-two-select-label"
                id="dataset-two"
                value={yDataSetTwoLabel}
                label="DATASET 2"
                onChange={handleYDataSetTwoLabel}
              >
                {Y_DATA_LIST.map((itm) => (
                  <MenuItem value={itm} key={itm}>
                    {itm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          
        </Grid>
        <Grid item sx={{ display: tabs["displayCharts"] }} xs={12}>
        {chartType == CHART_TYPES.LINE && (
            <Line options={options} data={data} />
          )}
          {chartType == CHART_TYPES.BAR && (
            <Bar options={options} data={data} />
          )}
          
        </Grid>

        <Grid item xs={12}>
        <TableContainer
        sx={{ display: tabs["displayRecords"] }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center"> Name </StyledTableCell>
              <StyledTableCell align="center"> Manufacturer </StyledTableCell>
              <StyledTableCell align="center"> Year </StyledTableCell>
              <StyledTableCell align="center"> Fuel Type </StyledTableCell>
              <StyledTableCell align="center"> Transmission </StyledTableCell>
              <StyledTableCell align="center"> Engine CC </StyledTableCell>
              <StyledTableCell align="center"> Power </StyledTableCell>
              <StyledTableCell align="center"> Seats </StyledTableCell>
              <StyledTableCell align="center"> Mileage(KM/L) </StyledTableCell>
              <StyledTableCell align="center"> Price </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                Average Yearly Sales{" "}
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.Name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.Name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.Manufacturer}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Year}</StyledTableCell>
                <StyledTableCell align="right">{row.Fuel_Type}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.Transmission}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row["Engine CC"]}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Power}</StyledTableCell>
                <StyledTableCell align="right">{row.Seats}</StyledTableCell>
                <StyledTableCell align="right">
                  {row["Mileage Km/L"]}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Price}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.AverageYearlySales}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
          
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompareCars;
