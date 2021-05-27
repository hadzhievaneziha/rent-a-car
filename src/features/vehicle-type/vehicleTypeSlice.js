import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = {
  status: "idle",
  data: [],
};

export const getVehicleTypes = createAsyncThunk(
  "vehicleType/getVehicleTypes",
  async () => {
    const response = await fetch(API + "/vehicleTypes");
    const data = await response.json();
    return data;
  }
);

export const vehicleTypeSlice = createSlice({
  name: "vehicleType",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVehicleTypes.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default vehicleTypeSlice.reducer;
