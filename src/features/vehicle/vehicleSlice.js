import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = {
  status: "idle",
  data: [],
  entity: null,
};

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (data) => {
    const body = JSON.stringify(data);
    await fetch(API + "/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const getVehicles = createAsyncThunk("vehicle/getVehicles", async () => {
  const response = await fetch(API + "/vehicles");
  const data = await response.json();
  return data;
});

export const getVehicle = createAsyncThunk("vehicle/getVehicle", async (id) => {
  const response = await fetch(API + "/vehicles/" + id);
  const data = await response.json();
  return data;
});

export const editVehicle = createAsyncThunk(
  "vehicle/editVehicle",
  async ({ id, data }) => {
    const body = JSON.stringify(data);
    await fetch(API + "/vehicles/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (id) => {
    await fetch(API + "/vehicles/" + id, { method: "DELETE" });
    return true;
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });

    builder
      .addCase(getVehicle.pending, (state) => {
        state.status = "loading";
        state.entity = null;
      })
      .addCase(getVehicle.fulfilled, (state, action) => {
        state.status = "idle";
        state.entity = action.payload;
      });
  },
});

export default vehicleSlice.reducer;
