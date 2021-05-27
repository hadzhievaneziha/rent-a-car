import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getVehicle } from "./vehicleSlice";
import { getVehicleTypes } from "../vehicle-type/vehicleTypeSlice";
import { getFuelTypes } from "../fuel-type/fuelTypeSlice";

export function VehicleShowPage() {
  const { id } = useParams();
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
    dispatch(getVehicle(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const currentVehicleType = vehicleType?.data?.find?.(
    (x) => x.id === vehicle?.entity?.vehicleTypeID
  );
  const currentFuelType = fuelType?.data?.find?.(
    (x) => x.id === vehicle?.entity?.fuelTypeID
  );

  return (
    <>
      <h1>
        {vehicle?.entity?.brand} {vehicle?.entity?.model}
      </h1>
      <Row>
        <Col sm="12">
          <Image src={vehicle?.entity?.pictureUrl} rounded fluid />
        </Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Vehicle type</strong>
        </Col>
        <Col sm="10">{currentVehicleType?.name}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Brand</strong>
        </Col>
        <Col sm="10">{vehicle?.entity?.brand}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Model</strong>
        </Col>
        <Col sm="10">{vehicle?.entity?.model}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Fuel type</strong>
        </Col>
        <Col sm="10">{currentFuelType?.name}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Number of seats</strong>
        </Col>
        <Col sm="10">{vehicle?.entity?.numberOfSeats}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Price per day</strong>
        </Col>
        <Col sm="10">{vehicle?.entity?.pricePerDay}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Count</strong>
        </Col>
        <Col sm="10">{vehicle?.entity?.count}</Col>
      </Row>
    </>
  );
}
