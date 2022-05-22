import React from 'react'
import { QueryFourComponent } from "../components/queries/QueryFourComponent";
import { QueryOneComponent } from "../components/queries/QueryOneComponent";
import { QueryThreeComponent } from "../components/queries/queryThreeComponent";
import QueryTwoComponent from "../components/queries/QueryTwoComponent";
import {QueryFiveComponent} from "../components/queries/QueryFiveComponent";
import { Tile } from "../components/Tile";
import { DataContainer } from "../components/DataContainer";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import { Box } from '@mui/system';
import QuerySixComponent from '../components/queries/QuerySixComponent';
import {QuerySevenComponent} from '../components/queries/QuerySevenComponent';
const Dashboard = () => {
  return (
    <Stack >
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Tile/>
            </Grid>
            <Grid item xs={4}>
                <Tile/>
            </Grid>
            <Grid item xs={4}>
                <Tile/>
            </Grid>
        </Grid>
        {/* Sized Box */}
        <Box sx={{margin:"0.25rem"}}>

        </Box>

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
                    <DataContainer title="PERCENTAGE CHANGE BETWEEN 2019 AND 2020 SALES OF TOP 10 BRANDS" queryComponent={<QueryFourComponent/>}/>
                    <DataContainer title="TOP 5 EXPENSIVE CAR BRANDS" queryComponent={<QueryTwoComponent/>}/>
                </Stack>
            </Grid>
        </Grid>
    </Stack>
  )
}

export default Dashboard