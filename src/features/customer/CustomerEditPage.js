import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { editCustomer, getCustomer } from "./customerSlice";

export function CustomerEditPage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: customer.entity,
  });
  const isLoading = customer.status === "loading";

  async function onSubmit(data) {
    await dispatch(editCustomer({ id, data }));
    history.push("/customers");
  }

  useEffect(() => {
    dispatch(getCustomer(id));
  }, [id, dispatch]);

  useEffect(() => {
    reset(customer.entity);
  }, [reset, customer.entity]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit customer</h1>

      <Form.Group controlId="fullName">
        <Form.Label>Full name</Form.Label>
        <Form.Control {...register("fullName")} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("email")} />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone number</Form.Label>
        <Form.Control {...register("phoneNumber")} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit
      </Button>
    </Form>
  );
}
