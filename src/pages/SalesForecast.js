import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material/";
import faker from "@faker-js/faker";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LinearProgress from "@mui/material/LinearProgress";
import { BASE_URL } from "../consts/urls";
import axios from "axios";
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

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function unixTimeStampToDate(unixTimeStamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(unixTimeStamp);
  // Hours part from the timestamp
  let dateString = date.toString().substring(0, 15);
  //short time part from the timestamp
  date = new Date(dateString);
  let finalDateSting = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  return finalDateSting;
}

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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "ACTUAL DATASET VALUES  vs  PREDICTED VALUES",
    },
  },
};
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
  const [rootMeanSquaredError, setRootMeanSquaredError] = useState(137);
  const [meanAbsolutePercentageError, setMeanAbsolutePercentageError] =
    useState(15);
  const [residualSumOfSquares, setResidualSumOfSquares] = useState(34343);
  const [isSeriesStationary, setIsSeriesStationary] = useState("YES");
  const [forecastValues, setForecastValues] = useState([]);
  const [forecastDates, setForecastDates] = useState([]);
  const [actualValues, setActualValues] = useState([]);
  const [actualDates, setActualDates] = useState([]);
  const [predictedValues, setPredictedValues] = useState([]);
  const [fileURL, setFileURL] = useState(demoCSVFileURL);
  const [pValue, setPValue] = useState(1);
  const [qValue, setQValue] = useState(1);
  const [nLags, setNLags] = useState(5);
  const [numberOfForecasts, setNumberOfForecasts] = useState(5);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


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
        Object.keys(JSON.parse(parsedObject["ACTUAL"])).map((unixTimeStamp)=>unixTimeStampToDate(parseInt(unixTimeStamp)))
      );
      setForecastDates(
        Object.keys(JSON.parse(parsedObject["FORECAST"])).map((unixTimeStamp)=>unixTimeStampToDate(parseInt(unixTimeStamp)))
      );
      console.log(parsedObject);
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setIsLoading(false);
  }

  // function fitModelData() {
  //   setIsLoading(true);
  //   let bodyFormData = new FormData();
  //   bodyFormData.append("file_url", fileURL);
  //   axios({
  //     method: "post",
  //     url: `${BASE_URL}/forecast/${pValue}/${qValue}/${numberOfForecasts}/${nLags}`,
  //     data: bodyFormData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //     .then(function (response) {
  //       //handle success
  //       console.log(response.data);
  //     })
  //     .catch(function (response) {
  //       //handle error
  //       // setError(response.error);
  //       console.log(response);
  //     });
  //     setIsLoading(false);
  // }
  console.log(actualDates);
  const data = {
    actualDates,
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

  useEffect(()=>{setActualDates(actualDates)},[actualDates]);
  const dataForecast = {
    forecastDates,
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
        <Grid item sm={12}>
          <Alert icon={false} severity="info">
            ENTER DATASET DETAILS
          </Alert>
        </Grid>
        <Grid item sm={12}>
          <TextField
            fullWidth
            onChange={handleCSVFileURL}
            id="csv_fine_url"
            label="CSV File URL"
            helperText={""}
            defaultValue={demoCSVFileURL}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            onChange={handlePValue}
            id="p_value"
            label="P Value"
            helperText={""}
            defaultValue="1"
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            onChange={handleQValue}
            id="q_value"
            label="Q value"
            helperText={""}
            defaultValue="1"
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            onChange={handleNLagsValue}
            id="nlags_value"
            label="nLags Value"
            helperText={""}
            defaultValue="9"
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            onChange={handleNumberOfForecasts}
            id="number_of_forecasts"
            label="nLags Value"
            helperText={""}
            defaultValue="9"
          />
        </Grid>
        <Grid item sm={12}>
          <Alert icon={false} severity="info">
            MODEL ACCURACY DETAILS
          </Alert>
        </Grid>
        <Grid item xs={6}>
          <Item>ROOT MEAN SQUARED ERROR : {rootMeanSquaredError}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            MEAN ABSOLUTE PERCENTAGE ERROR : {meanAbsolutePercentageError}%
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>RESIDUAL SUM OF SQUARES : {residualSumOfSquares}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>IS SERIES STATIONARY? : {isSeriesStationary}</Item>
        </Grid>
        <Grid item xs={8}>
          <Line options={options} data={data} />
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <Button variant="contained" onClick={fitModelWithData}>
              FIT MODEL WITH DATA
            </Button>
            {isLoading && <LinearProgress />}
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
            {error !== null && <Alert severity="error"> {error.message}</Alert>}
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
