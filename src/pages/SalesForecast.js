import React, { useState } from "react";
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
import Modal from "@mui/material/Modal";
import { demoCSVFileURL } from "../consts/urls";
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
  bgcolor: "background.paper",
  width: "75%",
  boxShadow: 10,
  p: 4,
};

//DATA MODEL ACCURACY STYLES
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SalesForecast = () => {
  //Initializing the initial states of sales forecast page
  const [updateModelAccuracyChart, setUpdateModelAccuracyChart] =
    useState(false);
  const [isModelFitted, setIsModelFitted] = useState(false);
  const [rootMeanSquaredError, setRootMeanSquaredError] = useState(null);
  const [meanAbsolutePercentageError, setMeanAbsolutePercentageError] =
    useState(null);
  const [residualSumOfSquares, setResidualSumOfSquares] = useState(null);
  const [isSeriesStationary, setIsSeriesStationary] = useState(null);
  const [fileURL, setFileURL] = useState(demoCSVFileURL);
  const [pValue, setPValue] = useState(1);
  const [qValue, setQValue] = useState(1);
  const [nLags, setNLags] = useState(1);
  const [numberOfForecasts, setNumberOfForecasts] = useState(5);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Responsible of handling modal which show forecasts
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handlers for different input fields
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

  const apiUrl = `${BASE_URL}/forecast/${pValue}/${qValue}/${numberOfForecasts}/${nLags}/`;

  //function responsible for fitting data to model using django rest api
  async function fitModelWithData() {
    setIsLoading(true);
    setError(null);
    //post request configurations
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_url: fileURL }),
    };
    //will fit model to data and set diffrent chart accuracy data
    try {
      const fetchResponse = await fetch(apiUrl, requestOptions);
      const data = await fetchResponse.json();
      const parsedObject = JSON.parse(data);
      parsedObject["IS_STATIONARY"] === "True"
        ? setIsSeriesStationary("YES")
        : setIsSeriesStationary("NO");
      setRootMeanSquaredError(parsedObject["RMSE"]);
      setMeanAbsolutePercentageError(parsedObject["MAPE"]);
      setResidualSumOfSquares(parsedObject["RSS"]);
      setIsModelFitted(true);
      setUpdateModelAccuracyChart(!updateModelAccuracyChart);
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
            defaultValue="1"
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
          <Item>
            ROOT MEAN SQUARED ERROR : <strong>{rootMeanSquaredError}</strong>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            MEAN ABSOLUTE PERCENTAGE ERROR :{" "}
            <strong>{meanAbsolutePercentageError}%</strong>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            RESIDUAL SUM OF SQUARES : <strong>{residualSumOfSquares}</strong>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            IS SERIES STATIONARY? : <strong>{isSeriesStationary}</strong>
          </Item>
        </Grid>
        <Grid item xs={12}>
          {isSeriesStationary == "NO" && (
            <Alert severity="warning">
              The time series with trends, or with seasonality, are not
              stationary — the trend and seasonality will affect the value of
              the time series at different times.
            </Alert>
          )}
        </Grid>
        <Grid item xs={12} lg={8}>
          {/* ModelAccuracyChart */}
          {!isModelFitted && (
            <Alert severity="info">
              FIT DATA TO VIEW MODEL'S ACCURACY CHART
            </Alert>
          )}
          {isModelFitted && (
            <ModelAccuracyChart
              apiUrl={apiUrl}
              updateChart={updateModelAccuracyChart}
              fileURL={fileURL}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            <Button variant="contained" onClick={fitModelWithData}>
              FIT MODEL TO DATA
            </Button>
            {isLoading && <LinearProgress />}
            {error !== null && <Alert severity="error"> {error.message}</Alert>}
            <Button
              disabled={isModelFitted === false}
              variant="outlined"
              onClick={handleOpen}
            >
              VIEW FORECAST
            </Button>
            {/* Instructions for sales forecast feature */}
            <Alert
              sx={{ height: "auto" }}
              icon={<QuestionMarkIcon />}
              severity="success"
            >
              <AlertTitle>
                <strong>HOW TO USE IT?</strong>
              </AlertTitle>
              <strong>STEP 1.</strong> Enter CSV file direct URL.
              <br />
              <i>
                CSV File should contain the first column as Proper Unique Dates{" "}
                <strong>(DD/MM/YYYY, MM/YYYY)</strong> and Second column as
                Sales values. All other columns will be ignored.
              </i>
              <br />
              <strong>STEP 2.</strong> Fit model to data.
              <br />
              <strong>STEP 3.</strong> View forecasted values
              <br />
              <strong>ADDITIONAL INFO</strong>
              <br />
              1. You can also try different combinations of P, Q and nLags
              values to increase accuracy.
              <br />
              <i>
                2. nLags Value should be less than half the number of data
                points.
              </i>
              <br />
              <i>
                <strong>
                  3. Combination with less Residual Sum of Squares value will be
                  better.
                </strong>
              </i>
            </Alert>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          {/* modal that will forecast datapoints */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* SalesForecastChart funcional react component showing line chart ploted by
              forcasted values
               */}
              <SalesForecastChart apiUrl={apiUrl} fileURL={fileURL} />
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesForecast;
