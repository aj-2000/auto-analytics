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

const demoCSVFileURL =
  "https://raw.githubusercontent.com/aj-2000/autoapi/main/App/Total_Car_Sales.csv";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

const optionsForecast = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sales Forecasting",
    },
  },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SalesForecast = () => {
  const [rootMeanSquaredError, setRootMeanSquaredError] = useState(null);
  const [meanAbsolutePercentageError, setMeanAbsolutePercentageError] =
    useState(null);
  const [residualSumOfSquares, setResidualSumOfSquares] = useState(null);
  const [isSeriesStationary, setIsSeriesStationary] = useState(null);
  const [forecastValues, setForecastValues] = useState([]);
  const [forecastDates, setForecastDates] = useState([]);
  const [actualValues, setActualValues] = useState([]);
  const [actualDates, setActualDates] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [predictedValues, setPredictedValues] = useState([]);
  const [fileURL, setFileURL] = useState(demoCSVFileURL);
  const [pValue, setPValue] = useState(1);
  const [qValue, setQValue] = useState(1);
  const [nLags, setNLags] = useState(5);
  const [numberOfForecasts, setNumberOfForecasts] = useState(5);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const labelsActual = [
    "Data point 1",
    "Data point 2",
    "Data point 3",
    "Data point 4",
    "Data point 5",
    "Data point 6",
    "Data point 7",
    "Data point 8",
    "Data point 9",
    "Data point 10",
    "Data point 11",
    "Data point 12",
    "Data point 13",
    "Data point 14",
  ];
  const labelsForecast = [
    "Forecast Data point 1",
    "Forecast Data point 2",
    "Forecast Data point 3",
    "Forecast Data point 4",
    "Forecast Data point 5",
    "Forecast Data point 6",
    "Forecast Data point 7",
  ];
  const [open, setOpen] = React.useState(false);
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
        `${BASE_URL}/forecast/${pValue}/${qValue}/${numberOfForecasts}/${nLags}/`,
        requestOptions
      );
      const data = await fetchResponse.json();
      const parsedObject = JSON.parse(data);
      setActualValues(Object.values(JSON.parse(parsedObject["ACTUAL"])));
      setPredictedValues(Object.values(JSON.parse(parsedObject["PREDICTED"])));
      setForecastValues(Object.values(JSON.parse(parsedObject["FORECAST"])));
      parsedObject["IS_STATIONARY"] === "True"
        ? setIsSeriesStationary("YES")
        : setIsSeriesStationary("NO");
      setRootMeanSquaredError(parsedObject["RMSE"]);
      setMeanAbsolutePercentageError(parsedObject["MAPE"]);
      setResidualSumOfSquares(parsedObject["RSS"]);
      setActualDates(
        Object.keys(JSON.parse(parsedObject["ACTUAL"])).map((unixTimeStamp) =>
          unixTimeStampToDate(parseInt(unixTimeStamp))
        )
      );
      setForecastDates(
        Object.keys(JSON.parse(parsedObject["FORECAST"])).map((unixTimeStamp) =>
          unixTimeStampToDate(parseInt(unixTimeStamp))
        )
      );
      console.log(parsedObject);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setIsLoading(false);
  }

  console.log(actualDates);
  const dataActualvsPredicted = {
    labelsActual,
    datasets: [
      {
        label: "Actual Values",
        data: predictedValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Predicted Values",
        data: actualValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    fitModelWithData();
  }, []);
  const dataForecast = {
    labelsForecast,
    datasets: [
      {
        label: "FORECASTED VALUES",
        data: forecastValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
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
          <Line options={optionsForecast} data={dataActualvsPredicted} />
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
                <Line options={optionsForecast} data={dataForecast} />
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
