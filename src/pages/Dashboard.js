import React from "react";
import { QueryFourComponent } from "../components/queries/QueryFourComponent";
import { QueryOneComponent } from "../components/queries/QueryOneComponent";
import { QueryThreeComponent } from "../components/queries/queryThreeComponent";
import QueryTwoComponent from "../components/queries/QueryTwoComponent";
import QueryFiveComponent from "../components/queries/QueryFiveComponent";
import QueryTenComponent from "../components/queries/QueryTenComponent";
import { DataContainer } from "../components/DataContainer";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/system/Box";
import QuerySixComponent from "../components/queries/QuerySixComponent";
import { QuerySevenComponent } from "../components/queries/QuerySevenComponent";
import QueryNineComponent from "../components/queries/QueryNineComponent";
import Overview from "../layout/Overview";
import QueryEightComponent from "../components/queries/QueryEightComponent";
//Table component is powered by MUI5 library
// Chart component is powered by chartJS library
// Componets from src/components/queries/ are rendered 
  // (structured using MUI Grid System, which is using flexbox)
const Dashboard = () => {
  return (
    <Stack>
      {/* Overview section showing sales, top brands */}
      <Overview />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Piechart showing different customer segments */}
          <Grid item xs={12} md={4} lg={4}>
            <DataContainer
              title="CUSTOMER SEGMENTS (IN PERCENTAGES) "
              queryComponent={<QuerySixComponent />}
            />
          </Grid>
          {/* Piechart showing top 5 countrie by cars production, sales and exports  */}
          <Grid item xs={12} md={4} lg={4}>
            <DataContainer
              title="TOP 5 COUNTRIES BY CARS"
              queryComponent={<QueryFiveComponent />}
            />
          </Grid>
          {/* Piechart showing top automakers by earining, revenue, marketcap and employees_count */}
          <Grid item xs={12} md={4} lg={4}>
            <DataContainer
              title="TOP AUTOMAKERS WORLDWIDE BY"
              queryComponent={<QueryTenComponent />}
            />
          </Grid>
          {/* Multi line chart showing Right time to launch analysis and prediction using simple moving average */}
          {/* Hiding This component on smaller screens i.e. less than 600pixels */}
          <Grid
            item
            display={{ xs: "none", sm: "block" }}
            sm={12}
            md={12}
            lg={8}
          >
            <DataContainer
              title="RIGHT TIME TO LAUNCH CAR USING SIMPLE MOVING AVERAGE(SMA)"
              queryComponent={<QuerySevenComponent />}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            {/* stack component from MUI 5 will stack components inside in vertical manner*/}
            <Stack>
            {/* Multi axis line chart showing sales variation with consumer sentiment */}    
              <DataContainer
                title="SALES VARIATION WITH CONSUMER SENTIMENT"
                queryComponent={<QueryNineComponent />}
              />
              {/* Scatter chart showing relationship between price and mileage */}
              <DataContainer
                title="RELATIONSHIP BETWEEN PRICE AND MILEAGE"
                queryComponent={<QueryOneComponent />}
              />
            </Stack>
          </Grid>
          {/* Bar chart showing relationship 2019 and 2020 sales of top 10 brands */}
          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="SALES VOLUME COMPARISON OF TOP 10 BRANDS"
              queryComponent={<QueryThreeComponent />}
            />
          </Grid>
          {/* Bar char showing top 5 best performs and top 5 worst perfomers */}
          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="TOP 5 WORST & BEST PERFORMERS"
              queryComponent={<QueryFourComponent />}
            />
          </Grid>
          {/* A table component showing top expensive brands by their avg car price */}
          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="TOP 5 EXPENSIVE CAR BRANDS"
              queryComponent={<QueryTwoComponent />}
            />
          </Grid>
          {/* A multitype chart component shows growth of passenger cars production in india */}
          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="GROWTH OF PASSENGER CARS PRODUCTION IN INDIA"
              queryComponent={<QueryEightComponent />}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Dashboard;
