import React from 'react';
import styled from 'styled-components';
import { LineChart } from "./LineChart";
import { PieChart } from './PieChart';
import { QueryOne } from './queries/QueryOneComponent';
import QueryTwoComponent from './queries/QueryTwoComponent';
import BasicTable from './Table';
import { VerticalBarChart } from './VerticalBarChart';


const Container = styled.div`
  display : flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 1rem;
  width: 48%;
  height: auto;
  background-color: 323232;
`
const ChartContainer = styled.div`
    background-color: #fff;
`

const ContainerHead = styled.div`
    display: flex;
    background-color: #2196f3;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: larger;
    font-weight: bolder;
`
const Title = styled.p`
    color: white;
    align-items: center;
`

export const DataContainer = (props) => {
  return (
    <Container>
        <ContainerHead>
            <Title>
               {props.title}
            </Title>
        </ContainerHead>
        <ChartContainer>
            {props.queryComponent}
        </ChartContainer>
        
    </Container>
  )
}
