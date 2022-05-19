import styled from "styled-components";
import CompareCars from "./components/CompareCars";
import { DataContainer } from "./components/DataContainer";
import { Navbar } from "./components/NavBar";
import { QueryOneComponent } from "./components/queries/QueryOneComponent";
import QueryTwoComponent from "./components/queries/QueryTwoComponent";
import BasicTable from "./components/Table";

import { Tile } from "./components/Tile";
const TileSection = styled.section`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: space-around;
`
const Container = styled.div`
  background-color: #F3F4F6;
  display: flex;
  flex-direction: column;
`

const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function App() {
  return (
    <Container>
    {/* <Navbar/>
    <TileSection>
    <Tile/>
    <Tile/>
    <Tile/>
    </TileSection>
    <CardSection>
    <DataContainer title="Top 5 Expensive Car Brands" queryComponent={<QueryTwoComponent/>}/>
    <DataContainer title="Relationship Between Price and Mileage" queryComponent={<QueryOneComponent/>}/>
    <DataContainer title="Relationship Between Price and Mileage" queryComponent={<QueryOneComponent/>}/>
    <DataContainer title="Top 5 Expensive Car Brands" queryComponent={<QueryTwoComponent/>}/>
    </CardSection> */}
    <CompareCars/>
    </Container>
    
  
  );
}

export default App;
