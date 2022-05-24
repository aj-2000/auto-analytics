import { BASE_URL } from "../../consts/urls";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { chartColors } from "../../consts/colors";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export function QueryOneComponent() {
  //Intializiation of States
  const [dataManual, setDataManual] = useState([]);
  const [dataAutomatic, setDataAutomatic] = useState([]);
  //Fetching Data
  useEffect(() => {
    async function getQueryOneDataManual() {
      const apiUrl = `${BASE_URL}/q1/2`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const ChartData = await response.json();
      const obj = JSON.parse(ChartData);
      const mileageManual = Object.values(obj["Mileage Km/L"]);
      const priceManual = Object.values(obj["Price"]);
      var data = [];
      for (let i = 0; i < priceManual.length; i++) {
        data.push({ x: priceManual[i], y: mileageManual[i] });
      }
      setDataManual(data);
    }
    async function getQueryOneDataAutomatic() {
      const apiUrl = `${BASE_URL}/q1/1`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const ChartData = await response.json();
      const obj = JSON.parse(ChartData);
      const mileageAutomatic = Object.values(obj["Mileage Km/L"]);
      const priceAutomatic = Object.values(obj["Price"]);
      var data = [];
      for (let i = 0; i < priceAutomatic.length; i++) {
        data.push({ x: priceAutomatic[i], y: mileageAutomatic[i] });
      }
      setDataAutomatic(data);
    }
    getQueryOneDataManual();
    getQueryOneDataAutomatic();
  }, []);
  console.log(dataAutomatic);
  //Configuring Scatter Chart
  const options = {
    scales: {
      yAxes: {
        title: {
          display: true,
          text: "Mileage(in KM/L)",

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
          text: "Price(in Lakhs)",
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
  //Data For Chart

  const data = {
    datasets: [
      {
        label: "Manual",
        data: dataManual,
        backgroundColor: chartColors[0],
      },
      {
        label: "Automatic",
        data: dataAutomatic,
        backgroundColor: chartColors[1],
      },
    ],
  };

  return <Scatter options={options} data={data} />;
}
