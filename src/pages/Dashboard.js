import React from 'react'
import { QueryFourComponent } from "../components/queries/QueryFourComponent";
import { QueryOneComponent } from "../components/queries/QueryOneComponent";
import { QueryThreeComponent } from "../components/queries/queryThreeComponent";
import QueryTwoComponent from "../components/queries/QueryTwoComponent";
import {QueryFiveComponent} from "../components/queries/QueryFiveComponent";
import { DataContainer } from "../components/DataContainer";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import { Box } from '@mui/system';
import QuerySixComponent from '../components/queries/QuerySixComponent';
import {QuerySevenComponent} from '../components/queries/QuerySevenComponent';
import QueryNineComponent from '../components/queries/QueryNineComponent';
import Overview from '../layout/Overview';
import QueryEightComponent from '../components/queries/QueryEightComponent';
const Dashboard = () => {
  return (
    <Stack >
        <Overview/>


        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <DataContainer title="CUSTOMER SEGMENTS" queryComponent={<QuerySixComponent/>} />
                    <DataContainer title="Top 5 Expensive Car Brands" queryComponent={<QueryFiveComponent/>}/>
                    

                </Stack>
            </Grid>
            <Grid item xs={8}>
                <Stack spacing={2}>
                    <DataContainer title="RIGHT TIME TO LAUNCH CAR USING SIMPLE MOVING AVERAGE(SMA)" queryComponent={<QuerySevenComponent/>}/>
                    <DataContainer title="RELATIONSHIP BETWEEN PRICE AND MILEAGE" queryComponent={<QueryOneComponent/>}/>
                    <DataContainer title="SALES VOLUME COMPARISON OF TOP 10 BRANDS" queryComponent={<QueryThreeComponent/>}/>
                    <DataContainer title="TOP 5 LOSERS & TOP 5 GAINERS" queryComponent={<QueryFourComponent/>}/>
                    <DataContainer title="TOP 5 EXPENSIVE CAR BRANDS" queryComponent={<QueryTwoComponent/>}/>
                    <DataContainer title="SALES VARIATION WITH CONSUMER SENTIMENT" queryComponent={<QueryNineComponent/>}/>
                    <DataContainer title="GOWTH OF PASSENGER CARS PRODUCTION IN INDIA" queryComponent={<QueryEightComponent/>}/>

                </Stack>
            </Grid>
        </Grid>
    </Stack>
  )
}

export default Dashboard