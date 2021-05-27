import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = {
  status: "idle",
  data: [],
};

export const getFuelTypes = createAsyncThunk(
  "fuelType/getFuelTypes",
  async () => {
    const response = await fetch(API + "/fuelTypes");
    const data = await response.json();
    return data;
  }
);

export const fuelTypeSlice = createSlice({
  name: "fuelType",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFuelTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFuelTypes.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default fuelTypeSlice.reducer;
