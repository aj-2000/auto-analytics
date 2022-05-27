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
        position: 'top',
      },
      title: {
        display: true,
        text: 'SALES FORECASTING by TIME SERIES ANALYSIS (AMIRA MODEL)',
      },
    },
};

const SalesForecastChart = (props) => {
  
  const [series, setSeries] = useState([]);
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
          Object.keys(JSON.parse(obj["FORECAST"])).map((unixTimeStamp) =>
            unixTimeStampToDate(parseInt(unixTimeStamp))
          ))
      setSeries(Object.values(JSON.parse(obj["FORECAST"])));
    }
    getChartData(labels);
  }, [labels, props.apiUrl, props.fileURL]);
  const data = {
    labels,
    datasets: [
      {
        label: "FORECASTED VALUES",
        data: series,
        borderColor: chartColorsV2[0],
        backgroundColor: chartColors[0],
      },
      
    ],
  };

  return <Line options={options} data={data} />;
};

export default SalesForecastChart;
