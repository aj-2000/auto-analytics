// Line chart plotted with forecasted values
import React from "react";
import { useState, useEffect } from "react";

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
import { chartColors, chartColorsV2 } from "../consts/colors";
import unixTimeStampToDate from "../utility/UnixTimeStampToDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Line Chart Configurations
const options = {
  scales: {
    yAxes: {
      title: {
        display: true,
        text: "Sales",
        font: {
          size: 15,
        },
      },
      ticks: {
        precision: 0,
      },
    },
    xAxes: {
      title: {
        display: true,
        text: "Next Datapoints",
        font: {
          size: 15,
        },
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "SALES FORECASTING by TIME SERIES ANALYSIS (AMIRA MODEL)",
    },
  },
};

const SalesForecastChart = (props) => {
  const [forecastedValues, setForecastedValues] = useState([]);
  //Next Datapoints (Days/Months/Year etc.) (Depends on Dataset)
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    async function getForecastData() {
      const apiUrl = props.apiUrl;
      const fileURL = props.fileURL;
      // Fetching the forecasts from autoapi forecast api endpoint
      // API Docs: https://github.com/aj-2000/autoapi
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // converitng entered url to json string to send to autoapi forecast api endpoint
        body: JSON.stringify({ file_url: fileURL }),
      };
      try {
        const response = await fetch(apiUrl, requestOptions);
        const fetchedResponse = await response.json();
        const forecastData = JSON.parse(fetchedResponse);
        // AutoAPI forecast send next data points as Unix timestamp(in milliseconds)
        // so converting them to dates in DD/MM/YYYY format
        setLabels(
          Object.keys(JSON.parse(forecastData["FORECAST"])).map(
            (unixTimeStamp) => unixTimeStampToDate(parseInt(unixTimeStamp))
          )
        );
        setForecastedValues(
          Object.values(JSON.parse(forecastData["FORECAST"]))
        );
      } catch (e) {
        //will print error to console if something goes wrong
        console.error(e);
      }
    }
    getForecastData();
  }, [labels, props.apiUrl, props.fileURL]);
  // ChartJS Line Chart Data Object
  const data = {
    labels,
    datasets: [
      {
        label: "FORECASTED VALUES",
        data: forecastedValues,
        borderColor: chartColorsV2[0],
        backgroundColor: chartColors[0],
      },
    ],
  };
  // ChartJS Line Chart
  return <Line options={options} data={data} />;
};

export default SalesForecastChart;
