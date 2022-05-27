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
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ACTUAL VALUES vs PREDICTED VALUES',
      },
    },
};

const ModelAccuracyChart = (props) => {
  const [seriesOne, setSeriesOne] = useState([]);
  const [seriesTwo, setSeriesTwo] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    async function getChartData() {
      const apiUrl = props.apiUrl;
      const fileURL = props.fileURL;
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_url: fileURL }),
      };
      const response = await fetch(apiUrl,requestOptions);
      const data = await response.json();
      const obj = JSON.parse(data);
     setLabels(
          Object.keys(JSON.parse(obj["ACTUAL"])).map((unixTimeStamp) =>
            unixTimeStampToDate(parseInt(unixTimeStamp))
          ))
      setSeriesOne(Object.values(JSON.parse(obj["ACTUAL"])));
      setSeriesTwo(Object.values(JSON.parse(obj["PREDICTED"])));
    }
    getChartData(labels);
  }, [labels, props.fileURL, props.apiUrl]);
  const data = {
    labels,
    datasets: [
      {
        label: "ACTUAL",
        data: seriesOne,
        borderColor: chartColorsV2[0],
        backgroundColor: chartColors[0],
      },
      {
        label: "PREDICTED",
        data: seriesTwo,
        borderColor: chartColorsV2[1],
        backgroundColor: chartColors[1],
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ModelAccuracyChart;
