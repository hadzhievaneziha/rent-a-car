import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { getVehicles } from "../vehicle/vehicleSlice";
import { getRents } from "./rentSlice";
import { getCustomers } from "../customer/customerSlice";
import { DATETIME_FORMAT } from "../../constants";

export function RentIndexPage() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const vehicle = useSelector((state) => state.vehicle);
  const rent = useSelector((state) => state.rent);
  const isLoading =
    customer.status === "loading" ||
    vehicle.status === "loading" ||
    rent.status === "loading";

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getVehicles());
    dispatch(getRents());
  }, [dispatch]);

  return (
    <>
      <h1>Rents</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Start date and time</th>
              <th>End date and time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rent?.data?.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">
                  No data
                </td>
              </tr>
            )}

            {rent.data.map((rent) => {
              const currentCustomer = customer.data.find(
                (x) => x.id === rent?.customerID
              );
              const currentVehicle = vehicle.data.find(
                (x) => x.id === rent?.vehicleID
              );

              return (
                <tr key={rent?.id}>
                  <td>{rent?.id}</td>
                  <td>{currentCustomer?.fullName}</td>
                  <td>
                    {currentVehicle?.brand} {currentVehicle?.model}
                  </td>
                  <td>{moment(rent?.startDateTime).format(DATETIME_FORMAT)}</td>
                  <td>{moment(rent?.endDateTime).format(DATETIME_FORMAT)}</td>
                  <td>{rent?.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}
