import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCustomer } from "./customerSlice";

export function CustomerShowPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const isLoading = customer.status === "loading";

  useEffect(() => {
    dispatch(getCustomer(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{customer?.entity?.fullName}</h1>
      <Row>
        <Col sm="2">
          <strong>Email address</strong>
        </Col>
        <Col sm="10">{customer?.entity?.email}</Col>
      </Row>
      <Row>
        <Col sm="2">
          <strong>Phone number</strong>
        </Col>
        <Col sm="10">{customer?.entity?.phoneNumber}</Col>
      </Row>
    </>
  );
}
