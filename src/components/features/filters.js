import { createSlice } from "@reduxjs/toolkit";

const intialStateValue = {
    make: 'All',
    fuelType: 'All',
    transmission: 'All',
    orderBy: 'None',
    year: 0,
    mileageKML: 0,
    engineCC: 0,
    power: 0,
    seats: 0,
    price: 0,
    numberOfRecords: 50
}
export const filtersSlice = createSlice({
    name:'filters',
    initialState: {value: intialStateValue},
    reducers: {
        setMake: (state, action) => {
            state.value['make'] = action.payload;
        },
        setFuelType: (state, action) => {
            state.value['fuelType'] = action.payload;
        },
        setTransmission: (state, action) => {
            state.value['trasmission'] = action.payload;
        },
        setOrderBy: (state, action) => {
            state.value['orderBy'] = action.payload;
        },
        setYear: (state, action) => {
            state.value['year'] = action.payload;
        },
        setMileageKML: (state, action) => {
            state.value['mileageKML'] = action.payload;
        },
        setEngineCC: (state, action) => {
            state.value['engineCC'] = action.payload;
        },
        setPower: (state, action) => {
            state.value['power'] = action.payload;
        },
        setSeats: (state, action) => {
            state.value['seats'] = action.payload;
        },
        setPrice: (state, action) => {
            state.value['price'] = action.payload;
        },
        setMake: (state, action) => {
            state.value['numberOfRecords'] = action.payload;
        },
        

    }
});