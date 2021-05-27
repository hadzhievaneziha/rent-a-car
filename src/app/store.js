import { configureStore } from "@reduxjs/toolkit";
import vehicleTypeReducer from "../features/vehicle-type/vehicleTypeSlice";
import fuelTypeReducer from "../features/fuel-type/fuelTypeSlice";
import vehicleReducer from "../features/vehicle/vehicleSlice";

export const store = configureStore({
  reducer: {
    vehicleType: vehicleTypeReducer,
    fuelType: fuelTypeReducer,
    vehicle: vehicleReducer,
  },
});
