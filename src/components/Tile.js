import styled from 'styled-components';
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { QueryThreeComponent } from '../components/queries/queryThreeComponent';
import { Grid, Stack } from '@mui/material';

const Figures = styled.p`
    font-size: 1.75rem;
    padding: 0%;
    margin: 0%;
    text-align: center;
`

const Text = styled.p`
    font-size: 1.5rem;
    padding: 0%;
    margin: 0%;
    text-align: center;
`

export const Tile = (props) => {
  return (
    <Paper elevation={3} >
    <Box >
        <Stack spacing={2}>
            <Box sx={{padding: "0.5rem", backgroundColor:"#EEDD82"}}>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={4}>
                <Figures>
                32,451
            </Figures>
                </Grid>
                <Grid item xs={4}>
                <Text>
                Visits
            </Text>
                </Grid>
                <Grid item xs={4}>
                <Text>
                +14(+0.05%)
            </Text>
                </Grid>
            </Grid>
            </Box>
            <QueryThreeComponent/>
        </Stack>
       
        
    </Box>
    </Paper>
  )
}
