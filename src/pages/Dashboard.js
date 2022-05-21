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
            <Grid item xs={6}>
                <Stack spacing={2}>
                    <DataContainer title="Relationship Between Price and Mileage" queryComponent={<QueryFourComponent/>}/>
                    <DataContainer title="Top 5 Expensive Car Brands" queryComponent={<QueryFiveComponent/>}/>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={2}>
                    <DataContainer title="Relationship Between Price and Mileage" queryComponent={<QueryOneComponent/>}/>
                    <DataContainer title="Top 5 Expensive Car Brands" queryComponent={<QueryThreeComponent/>}/>
                    <DataContainer title="Top 5 Expensive Car Brands" queryComponent={<QueryTwoComponent/>}/>
                </Stack>
            </Grid>
        </Grid>
    </Stack>
  )
}

export default Dashboard