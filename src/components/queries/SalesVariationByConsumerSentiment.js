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
        text: "Sales",
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
        text: "Consumer Sentiment",
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

const SalesVariationByConsumerSentiment = () => {
  const [seriesOne, setSeriesOne] = useState([]);
  const [seriesTwo, setSeriesTwo] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    async function getQueryNineData() {
      const apiUrl = `${BASE_URL}/q9`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const obj = JSON.parse(data);
      console.log(obj);
      setLabels(Object.values(obj["Date"]));
      setSeriesOne(Object.values(obj["Total Sales"]));
      setSeriesTwo(Object.values(obj["Consumer Sentiment"]));
    }
    getQueryNineData();
  }, []);
  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: seriesOne,
        borderColor: chartColorsV2[0],
        backgroundColor: chartColors[0],
        yAxisID: "y",
      },
      {
        label: "Consumer Sentiment",
        data: seriesTwo,
        borderColor: chartColorsV2[1],
        backgroundColor: chartColors[1],
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SalesVariationByConsumerSentiment;
