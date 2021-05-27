import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { getVehicleTypes } from "../vehicle-type/vehicleTypeSlice";
import { getFuelTypes } from "../fuel-type/fuelTypeSlice";
import { createVehicle } from "./vehicleSlice";

export function VehicleCreatePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const vehicleType = useSelector((state) => state.vehicleType);
  const fuelType = useSelector((state) => state.fuelType);
  const { register, handleSubmit } = useForm();
  const isLoading =
    vehicleType.status === "loading" || fuelType.status === "loading";

  async function onSubmit(data) {
    const serializedData = { ...data };

    if (serializedData.vehicleTypeID !== "") {
      serializedData.vehicleTypeID = Number(serializedData.vehicleTypeID);
    }

    if (serializedData.fuelTypeID !== "") {
      serializedData.fuelTypeID = Number(serializedData.fuelTypeID);
    }

    await dispatch(createVehicle(serializedData));
    history.push("/vehicles");
  }

  useEffect(() => {
    dispatch(getVehicleTypes());
    dispatch(getFuelTypes());
  }, [dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create vehicle</h1>

      <Form.Group controlId="vehicleTypeID">
        <Form.Label>Vehicle type</Form.Label>
        <Form.Control as="select" {...register("vehicleTypeID")}>
          <option value="" defaultValue>
            Select a vehicle type
          </option>
          {vehicleType.data.map((vehicleType) => (
            <option key={vehicleType.id} value={vehicleType.id}>
              {vehicleType.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="brand">
        <Form.Label>Brand</Form.Label>
        <Form.Control {...register("brand")} />
      </Form.Group>

      <Form.Group controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Control {...register("model")} />
      </Form.Group>

      <Form.Group controlId="fuelTypeID">
        <Form.Label>Fuel type</Form.Label>
        <Form.Control as="select" {...register("fuelTypeID")}>
          <option value="" defaultValue>
            Select a fuel type
          </option>
          {fuelType.data.map((fuelType) => (
            <option key={fuelType.id} value={fuelType.id}>
              {fuelType.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="numberOfSeats">
        <Form.Label>Number of seats</Form.Label>
        <Form.Control {...register("numberOfSeats")} />
      </Form.Group>

      <Form.Group controlId="pictureUrl">
        <Form.Label>Picture (link)</Form.Label>
        <Form.Control {...register("pictureUrl")} />
      </Form.Group>

      <Form.Group controlId="pricePerDay">
        <Form.Label>Price per day</Form.Label>
        <Form.Control {...register("pricePerDay")} />
      </Form.Group>

      <Form.Group controlId="count">
        <Form.Label>Count</Form.Label>
        <Form.Control {...register("count")} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}
