import { configureStore } from "@reduxjs/toolkit";
import vehicleTypeReducer from "../features/vehicle-type/vehicleTypeSlice";
import fuelTypeReducer from "../features/fuel-type/fuelTypeSlice";
import vehicleReducer from "../features/vehicle/vehicleSlice";
import customerReducer from "../features/customer/customerSlice";
import rentReducer from "../features/rent/rentSlice";

export const store = configureStore({
  reducer: {
    vehicleType: vehicleTypeReducer,
    fuelType: fuelTypeReducer,
    vehicle: vehicleReducer,
    customer: customerReducer,
    rent: rentReducer,
  },
});
