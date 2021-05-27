import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../constants";

const initialState = {
  status: "idle",
  data: [],
  entity: null,
};

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (data) => {
    const body = JSON.stringify(data);
    await fetch(API + "/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async () => {
    const response = await fetch(API + "/customers");
    const data = await response.json();
    return data;
  }
);

export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (id) => {
    const response = await fetch(API + "/customers/" + id);
    const data = await response.json();
    return data;
  }
);

export const editCustomer = createAsyncThunk(
  "customer/editCustomer",
  async ({ id, data }) => {
    const body = JSON.stringify(data);
    await fetch(API + "/customers/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id) => {
    await fetch(API + "/customers/" + id, { method: "DELETE" });
    return true;
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });

    builder
      .addCase(getCustomer.pending, (state) => {
        state.status = "loading";
        state.entity = null;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.status = "idle";
        state.entity = action.payload;
      });
  },
});

export default customerSlice.reducer;
