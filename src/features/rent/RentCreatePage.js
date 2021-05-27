import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";

import { createRent, getRents } from "./rentSlice";
import { getVehicle } from "../vehicle/vehicleSlice";
import { getCustomers } from "../customer/customerSlice";
import { DATETIME_FORMAT } from "../../constants";

export function RentCreatePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const rent = useSelector((state) => state.rent);
  const vehicle = useSelector((state) => state.vehicle);
  const customer = useSelector((state) => state.customer);
  const { register, handleSubmit, control, watch } = useForm();
  const watchCustomerID = watch("customerID");
  const watchStartDateTime = watch("startDateTime");
  const watchEndDateTime = watch("endDateTime");
  const rentDays = useMemo(() => {
    if (!watchStartDateTime || !watchEndDateTime) {
      return 0;
    }

    return (
      moment(watchEndDateTime).diff(moment(watchStartDateTime), "days") + 1
    );
  }, [watchStartDateTime, watchEndDateTime]);
  const price = rentDays ? vehicle?.entity?.pricePerDay * rentDays : null;
  const discount = useMemo(() => {
    const currentDate = moment().startOf("day").hour(12);
    const rentsWithin60Days = rent.data?.filter((rent) => {
      // Get only selected customer
      if (rent.customerID !== Number(watchCustomerID)) {
        return false;
      }

      // Calculate how many days are passed since rent start
      const daysSince = currentDate.diff(moment(rent.startDateTime), "days");

      // Negative days are in the future -> don't include them
      // More than 60 days -> don't include them
      if (daysSince < 0 || daysSince > 60) {
        return false;
      }

      return true;
    });

    if (rentsWithin60Days.length > 3) {
      return 0.15;
    }

    if (rentDays > 10) {
      return 0.1;
    }

    if (rentDays > 5) {
      return 0.07;
    }

    if (rentDays > 3) {
      return 0.05;
    }

    return null;
  }, [vehicle.data, rentDays, watchCustomerID]);
  const finalPrice = useMemo(() => {
    if (!price) {
      return null;
    }

    if (!discount) {
      return price;
    }

    return price - price * discount;
  }, [price, discount]);
  const isLoading =
    vehicle.status === "loading" || customer.status === "loading";

  async function onSubmit(data) {
    const serializedData = {
      vehicleID: Number(id),
      price: finalPrice,
      ...data,
    };

    if (serializedData.customerID !== "") {
      serializedData.customerID = Number(serializedData.customerID);
    }

    await dispatch(
      createRent({
        rent: serializedData,
        vehicle: {
          id,
          count: vehicle.entity.count - 1,
        },
      })
    );
    history.push("/rents");
  }

  useEffect(() => {
    dispatch(getRents());
    dispatch(getVehicle(id));
    dispatch(getCustomers());
  }, [id, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>
        Rent {vehicle?.entity?.brand} {vehicle?.entity?.model}
      </h1>

      <Form.Group controlId="customerID">
        <Form.Label>Customer</Form.Label>
        <Form.Control as="select" {...register("customerID")}>
          <option value="" defaultValue>
            Select a customer
          </option>
          {customer.data.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.fullName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="startDateTime">
        <Form.Label>Start date and time</Form.Label>
        <div className="d-block">
          <Controller
            name="startDateTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                className="form-control"
                showTimeSelect
                dateFormat={DATETIME_FORMAT}
                timeFormat="HH:mm"
                minDate={new Date()}
                maxDate={watchEndDateTime}
              />
            )}
          />
        </div>
      </Form.Group>

      <Form.Group controlId="endDateTime">
        <Form.Label>End date and time</Form.Label>
        <div className="d-block">
          <Controller
            name="endDateTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                className="form-control"
                showTimeSelect
                dateFormat={DATETIME_FORMAT}
                timeFormat="HH:mm"
                minDate={watchStartDateTime ?? new Date()}
              />
            )}
          />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Price per day: {vehicle?.entity?.pricePerDay}</Form.Label>
      </Form.Group>

      {price && (
        <Form.Group>
          <Form.Label>
            Price:{" "}
            {discount ? (
              <>
                <strike>{price}</strike> - {(discount * 100) | 0}% ={" "}
                {finalPrice}
              </>
            ) : (
              price
            )}
          </Form.Label>
        </Form.Group>
      )}

      <Button variant="warning" type="submit">
        Rent
      </Button>
    </Form>
  );
}
