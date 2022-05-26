import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material/";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LinearProgress from "@mui/material/LinearProgress";
import { BASE_URL } from "../consts/urls";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Modal from "@mui/material/Modal";
import unixTimeStampToDate from '../utility/UnixTimeStampToDate'
import {demoCSVFileURL} from "../consts/urls"
import { chartColors, chartColorsV2 } from "../consts/colors";
import ModelAccuracyChart from "../components/ModelAccuracyChart";
import SalesForecastChart from "../components/SalesForecastChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100vh",
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 4,
};

//Options for Actual vs Predited chart
const optionsActualvsPreditedChart = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'ACTUAL vs PREDICTED Values',
    },
  },
};

const labels = ['a', 'b', 'c', 'd', 'e', 'f']
//DATA MODEL ACCURACY STYLES
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SalesForecast = () => {
  const [updateModelAccuracyChart, setUpdateModelAccuracyChart] = useState(false)
  const [isModelFitted, setIsModelFitted] = useState(false)
  const [rootMeanSquaredError, setRootMeanSquaredError] = useState(null);
  const [meanAbsolutePercentageError, setMeanAbsolutePercentageError] =
    useState(null);
  const [residualSumOfSquares, setResidualSumOfSquares] = useState(null);
  const [isSeriesStationary, setIsSeriesStationary] = useState(null);
  const [fileURL, setFileURL] = useState(demoCSVFileURL);
  const [pValue, setPValue] = useState(1);
  const [qValue, setQValue] = useState(1);
  const [nLags, setNLags] = useState(5);
  const [numberOfForecasts, setNumberOfForecasts] = useState(5);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCSVFileURL = (event) => {
    setFileURL(event.target.value);
  };
  const handlePValue = (event) => {
    setPValue(event.target.value);
  };
  const handleQValue = (event) => {
    setQValue(event.target.value);
  };
  const handleNLagsValue = (event) => {
    setNLags(event.target.value);
  };
  const handleNumberOfForecasts = (event) => {
    setNumberOfForecasts(event.target.value);
  };

  const apiUrl = `${BASE_URL}/forecast/${pValue}/${qValue}/${numberOfForecasts}/${nLags}/`

  async function fitModelWithData() {
    
    setIsLoading(true);
    setError(null);
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_url: fileURL }),
    };
    try {
      const fetchResponse = await fetch(
        apiUrl,
        requestOptions
      );
      const data = await fetchResponse.json();
      const parsedObject = JSON.parse(data);
      parsedObject["IS_STATIONARY"] === "True"
        ? setIsSeriesStationary("YES")
        : setIsSeriesStationary("NO");
      setRootMeanSquaredError(parsedObject["RMSE"]);
      setMeanAbsolutePercentageError(parsedObject["MAPE"]);
      setResidualSumOfSquares(parsedObject["RSS"]);
      setIsModelFitted(true)
      setUpdateModelAccuracyChart(!updateModelAccuracyChart)
      
    } catch (e) {
      setError(e);
      setIsModelFitted(false);
      console.log(e);
    }
    setIsLoading(false);
  }

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} flexGrow={1}>
        <Grid item xs={12}>
          <Alert icon={false} severity="info">
            ENTER DATASET DETAILS
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={handleCSVFileURL}
            id="csv_fine_url"
            label="CSV File URL"
            helperText={""}
            defaultValue={demoCSVFileURL}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            onChange={handlePValue}
            id="p_value"
            label="P Value"
            helperText={""}
            defaultValue="1"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            onChange={handleQValue}
            id="q_value"
            label="Q value"
            helperText={""}
            defaultValue="1"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            onChange={handleNLagsValue}
            id="nlags_value"
            label="nLags Value"
            helperText={""}
            defaultValue="9"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            fullWidth
            onChange={handleNumberOfForecasts}
            id="number_of_forecasts"
            label="Number of Forecasts"
            helperText={""}
            defaultValue="5"
          />
        </Grid>
        <Grid item xs={12}>
          <Alert icon={false} severity="info">
            MODEL ACCURACY DETAILS
          </Alert>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>ROOT MEAN SQUARED ERROR : <strong>{rootMeanSquaredError}</strong></Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            MEAN ABSOLUTE PERCENTAGE ERROR : <strong>{meanAbsolutePercentageError}%</strong>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>RESIDUAL SUM OF SQUARES : <strong>{residualSumOfSquares}</strong></Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>IS SERIES STATIONARY? : <strong>{isSeriesStationary}</strong></Item>
        </Grid>
        <Grid item xs={12} lg={8}>
         {/* ModelAccuracyChart */}
          {isModelFitted && <ModelAccuracyChart apiUrl={apiUrl} updateChart={updateModelAccuracyChart} fileURL={fileURL}/>}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            <Button variant="contained" onClick={fitModelWithData}>
              FIT MODEL WITH DATA
            </Button>
            {isLoading && <LinearProgress />}
            {error !== null && <Alert severity="error"> {error.message}</Alert>}
            <Button variant="outlined" onClick={handleOpen}>
              VIEW FORECAST
            </Button>
            {/* MODAL */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <SalesForecastChart apiUrl={apiUrl} fileURL={fileURL} />
              </Box>
            </Modal>
            <Alert icon={<QuestionMarkIcon />} severity="success">
              <AlertTitle>HOW TO USE?</AlertTitle>
              This is a success alert — <strong>check it out!</strong>
            </Alert>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesForecast;
