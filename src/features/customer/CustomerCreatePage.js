import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { createCustomer } from "./customerSlice";

export function CustomerCreatePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    await dispatch(createCustomer(data));
    history.push("/customers");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create customer</h1>

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
        Create
      </Button>
    </Form>
  );
}
