import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { BASE_URL } from "../../consts/urls";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const tabs = [
  "Drive Train",
  "Transmission",
  "Class",
  "Brand",
  "Fuel_Type",
  "Body_type",
];

const QuerySixComponent = () => {
  const [value, setValue] = useState(0);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: tabs[value],
        data: series,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(3, 62, 62, 1)",
          "rgba(41, 52, 98, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getQuerySixData() {
      const apiUrl = `${BASE_URL}/q6/${value}`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const obj = JSON.parse(data);
      console.log(obj);
      setLabels(Object.keys(obj));
      setSeries(Object.values(obj));
    }
    getQuerySixData();
  }, [value]);
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Drive Train" />
        <Tab label="Transmission" />
        <Tab label="Class" />
        <Tab label="Brand" />
        <Tab label="Fuel Type" />
        <Tab label="Body Type" />
      </Tabs>
      <Pie data={data} />;
    </Box>
  );
};

export default QuerySixComponent;
