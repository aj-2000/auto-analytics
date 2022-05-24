import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../consts/urls";

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
import { chartColors, chartColorsV2 } from "../../consts/colors";

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
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Numbre of Cars Produced",
        font: {
          size: 15,
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
        text: "Percent Change",
        font: {
          size: 15,
        },
      },
      ticks: {
        precision: 0,
      },
    },
  },
};

const QueryEightComponent = () => {
  const [seriesOne, setSeriesOne] = useState([]);
  const [seriesTwo, setSeriesTwo] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    async function getQueryEightData() {
      const apiUrl = `${BASE_URL}/q8`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const objArray = JSON.parse(data);
      console.log(objArray);
      setLabels(
        objArray.map((obj) => {
          return obj.Year;
        })
      );
      setSeriesOne(
        objArray.map((obj) => {
          return obj["Value"];
        })
      );
      setSeriesTwo(
        objArray.map((obj) => {
          return obj["Percent Change"];
        })
      );
    }
    getQueryEightData();
  }, []);
  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Percent Change from Previous Production",
        data: seriesTwo,
        borderColor: chartColorsV2[1],
        backgroundColor: chartColors[1],
        borderWidth: 2,
        yAxisID: "y1",
      },
      {
        type: "bar",
        label: "Numbre of Cars Produced",
        data: seriesOne,
        borderColor: chartColorsV2[0],
        backgroundColor: chartColors[0],
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default QueryEightComponent;
