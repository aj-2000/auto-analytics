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

import { Pie } from "react-chartjs-2";
import { BASE_URL } from "../../consts/urls";
import { chartColors } from "../../consts/colors";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const tabs = [
  "Cars Production(Million)",
  "Cars Sales(Million)",
  "Cars Exports(Billion USD)",
];

const QueryFiveComponent = () => {
  const [value, setValue] = useState(0);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: tabs[value],
        data: series,
        backgroundColor: chartColors,
        borderWidth: 1,
      },
    ],
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getQueryFiveData() {
      const apiUrl = `${BASE_URL}/q5/${value}`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      const obj = JSON.parse(data);
      console.log(obj);
      setLabels(Object.values(obj["Country"]));
      setSeries(Object.values(obj[tabs[value]]));
    }
    getQueryFiveData();
  }, [value]);
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        sx={{ justifyContent: "center" }}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Production(M UNITS)" />
        <Tab label="Sales(M UNITS)" />
        <Tab label="Exports(B USD)" />
      </Tabs>
      <Pie data={data} />;
    </Box>
  );
};

export default QueryFiveComponent;
