import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomers } from "./customerSlice";

export function CustomerIndexPage() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const isLoading = customer.status === "loading";

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  function handleDeleteClick(id) {
    return async () => {
      await dispatch(deleteCustomer(id));
      await dispatch(getCustomers());
    };
  }

  return (
    <>
      <h1>Customers</h1>
      <Button variant="success" as={Link} to="/customers/create">
        Create customer
      </Button>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Full name</th>
              <th>Email address</th>
              <th>Phone number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customer?.data?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No data
                </td>
              </tr>
            )}
            {customer.data.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber}</td>
                <td>
                  <Button
                    variant="primary"
                    as={Link}
                    to={"/customers/" + customer.id}
                  >
                    View
                  </Button>
                  <Button
                    variant="info"
                    as={Link}
                    to={"/customers/" + customer.id + "/edit"}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={handleDeleteClick(customer.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
