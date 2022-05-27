import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BASE_URL } from "../../consts/urls";
import { chartColors } from "../../consts/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesVolumesComparisonOfTopTenBrands() {
  const [labels, setLabels] = useState([]);
  const [seriesOne, setSeriesOne] = useState([]);
  const [seriesTwo, setSeriesTwo] = useState([]);

  useEffect(() => {
    async function getQueryThreeData() {
      const apiUrl = `${BASE_URL}/q3/`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const obj = JSON.parse(data);
      setLabels(Object.values(obj.Brand));
      setSeriesOne(Object.values(obj["2019 sales"]));
      setSeriesTwo(Object.values(obj["2020 sales"]));
    }
    getQueryThreeData();
  }, []);
  const options = {
    responsive: true,
    scales: {
      yAxes: {
        title: {
          display: true,
          text: "Sales Volume",
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
          text: "Brand",
          font: {
            size: 15,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "2019 Sales",
        data: seriesOne,
        backgroundColor: chartColors[0],
      },
      {
        label: "2020 Sales",
        data: seriesTwo,
        backgroundColor: chartColors[1],
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default SalesVolumesComparisonOfTopTenBrands;