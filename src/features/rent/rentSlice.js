import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = {
  status: "idle",
  data: [],
};

export const createRent = createAsyncThunk(
  "rent/createRent",
  async ({ rent, vehicle }) => {
    const rentBody = JSON.stringify(rent);
    await fetch(API + "/rents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: rentBody,
    });

    const vehicleBody = JSON.stringify({ count: vehicle.count });
    await fetch(API + "/vehicles/" + vehicle.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: vehicleBody,
    });
    return true;
  }
);

export const getRents = createAsyncThunk("rent/getRents", async () => {
  const response = await fetch(API + "/rents");
  const data = await response.json();
  return data;
});

export const rentSlice = createSlice({
  name: "rent",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRents.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default rentSlice.reducer;
