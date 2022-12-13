import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiAirMeasurementsModel, getMeasurements} from '../proxies/airquality.proxy';

export const $getAirMeasurementsFirstCity = createAsyncThunk("thunk-get-first-measurements",  getMeasurements);

export const $getAirMeasurementsSecondCity = createAsyncThunk("thunk-get-second-measurements",  getMeasurements);


export const airqualitySlice = createSlice({
    name: "airmeasurement",
    initialState:{
        firstCityMeasurements: new Array<ApiAirMeasurementsModel>(),
        secondCityMeasurements: new Array<ApiAirMeasurementsModel>()
    },
    reducers:{},
    extraReducers(builder){
        builder.addCase($getAirMeasurementsFirstCity.fulfilled, (state, action) => {
            state.firstCityMeasurements = action.payload;
        }),
        builder.addCase($getAirMeasurementsSecondCity.fulfilled, (state, action) => {
            state.secondCityMeasurements = action.payload;
        });
    }
});

export default airqualitySlice.reducer;

