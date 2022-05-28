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
// ChartJS chart Configurations
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "ACTUAL VALUES vs PREDICTED VALUES",
    },
  },
};

const ModelAccuracyChart = (props) => {
  const [actualValues, setActualValues] = useState([]);
  const [forecastedValues, setForecastedValues] = useState([]);
  // labels will store dates from CSV File
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    async function getChartData() {
      //Configured ForecastAPI URL (sent by parend SalesForecast Component)
      const apiUrl = props.apiUrl;
      //CSV file url from input field(sent by parend SalesForecast Component)
      const fileURL = props.fileURL;
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //Convering Fileurl from Input field to JSON string
        body: JSON.stringify({ file_url: fileURL }),
      };
      // Error Handling by Try-Catch Block
      try {
        const response = await fetch(apiUrl, requestOptions);
        const fetchedResponse = await response.json();
        const forecastData = JSON.parse(fetchedResponse);
        setLabels(
          Object.keys(JSON.parse(forecastData["ACTUAL"])).map((unixTimeStamp) =>
            unixTimeStampToDate(parseInt(unixTimeStamp))
          )
        );
        setActualValues(Object.values(JSON.parse(forecastData["ACTUAL"])));
        setForecastedValues(
          Object.values(JSON.parse(forecastData["PREDICTED"]))
        );
      } catch (e) {
        //will print error to console if something goes wrong
        console.error(e);
      }
    }
    getChartData(labels);
  }, [labels, props.fileURL, props.apiUrl]);

  //chartJS data object
  const data = {
    labels,
    datasets: [
      {
        label: "ACTUAL",
        data: actualValues,
        borderColor: chartColorsV2[0],
        backgroundColor: chartColors[0],
      },
      {
        label: "PREDICTED",
        data: forecastedValues,
        borderColor: chartColorsV2[1],
        backgroundColor: chartColors[1],
      },
    ],
  };

  // ChartJS MultiLine Chart
  return <Line options={options} data={data} />;
};

export default ModelAccuracyChart;
