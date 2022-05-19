import styled from 'styled-components';
import React from 'react';
import { LineChart } from './LineChart';
const Container = styled.div`
    display: flex;
    box-sizing: border-box;
    flex: 1;
    width: auto;
    height: auto;
    box-shadow: black;
    background-color: #fff;
    padding: 20px;
    margin: 10px;
    margin-top: 20px;
    justify-content: space-around;
`;
const InfoContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: auto;
   justify-content: space-around;

`

const Figures = styled.p`
    font-size: 2rem;
    padding: 0%;
    margin: 0%;
`
const Tiltle = styled.p`
    font-size: 1.5rem;
    padding: 0%;
    margin: 0%;
`
const Percentages = styled.p`
    font-size: 1.5rem;
    padding: 0%;
    margin: 0%;
`
const GraphContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: auto;
`
export const Tile = (props) => {
  return (
    <Container>
        <InfoContainer>
            <Figures>
                32,451
            </Figures>
            <Tiltle>
                Visits
            </Tiltle>
            <Percentages>
                +14(+0.05%)
            </Percentages>
        </InfoContainer>
        <GraphContainer>
        <LineChart/>
        </GraphContainer>
    </Container>
  )
}
