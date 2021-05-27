import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteVehicle, getVehicles } from "./vehicleSlice";
import { getVehicleTypes } from "../vehicle-type/vehicleTypeSlice";
import { getFuelTypes } from "../fuel-type/fuelTypeSlice";

export function VehicleIndexPage() {
  const dispatch = useDispatch();
  const vehicleType = useSelector((state) => state.vehicleType);
  const fuelType = useSelector((state) => state.fuelType);
  const vehicle = useSelector((state) => state.vehicle);
  const isLoading =
    vehicleType.status === "loading" ||
    fuelType.status === "loading" ||
    vehicle.status === "loading";

  useEffect(() => {
    dispatch(getVehicleTypes());
    dispatch(getFuelTypes());
    dispatch(getVehicles());
  }, [dispatch]);

  function handleDeleteClick(id) {
    return async () => {
      await dispatch(deleteVehicle(id));
      await dispatch(getVehicles());
    };
  }

  return (
    <>
      <h1>Vehicles</h1>
      <Button variant="success" as={Link} to="/vehicles/create">
        Create vehicle
      </Button>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle type</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Fuel type</th>
              <th>Number of seats</th>
              <th>Price per day</th>
              <th>Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicle.data.map((vehicle) => {
              const currentVehicleType = vehicleType.data.find(
                (x) => x.id === vehicle.vehicleTypeID
              );
              const currentFuelType = fuelType.data.find(
                (x) => x.id === vehicle.fuelTypeID
              );

              return (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{currentVehicleType.name}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{currentFuelType.name}</td>
                  <td>{vehicle.numberOfSeats}</td>
                  <td>{vehicle.pricePerDay}</td>
                  <td>{vehicle.count}</td>
                  <td>
                    <Button
                      variant="primary"
                      as={Link}
                      to={"/vehicles/" + vehicle.id}
                    >
                      View
                    </Button>
                    <Button
                      variant="info"
                      as={Link}
                      to={"/vehicles/" + vehicle.id + "/edit"}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      type="button"
                      onClick={handleDeleteClick(vehicle.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
