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
const Dashboard = () => {
  return (
    <Stack>
      <Overview />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <DataContainer
              title="CUSTOMER SEGMENTS (IN PERCENTAGES) "
              queryComponent={<QuerySixComponent />}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <DataContainer
              title="TOP 5 COUNTRIES BY CARS"
              queryComponent={<QueryFiveComponent />}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <DataContainer
              title="TOP AUTOMAKERS WORLDWIDE BY"
              queryComponent={<QueryTenComponent />}
            />
          </Grid>
          {/* Hiding This component on smaller screens */}
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
            <Stack>
              <DataContainer
                title="SALES VARIATION WITH CONSUMER SENTIMENT"
                queryComponent={<QueryNineComponent />}
              />
              <DataContainer
                title="RELATIONSHIP BETWEEN PRICE AND MILEAGE"
                queryComponent={<QueryOneComponent />}
              />
            </Stack>
          </Grid>

          {/* <Grid item sm={12} md={12} lg = {4}>
        </Grid> */}

          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="SALES VOLUME COMPARISON OF TOP 10 BRANDS"
              queryComponent={<QueryThreeComponent />}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="TOP 5 LOSERS & TOP 5 GAINERS"
              queryComponent={<QueryFourComponent />}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="TOP 5 EXPENSIVE CAR BRANDS"
              queryComponent={<QueryTwoComponent />}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <DataContainer
              title="GOWTH OF PASSENGER CARS PRODUCTION IN INDIA"
              queryComponent={<QueryEightComponent />}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Dashboard;
