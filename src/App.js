import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { VehiclePage } from "./features/vehicle/VehiclePage";
import { CustomerPage } from "./features/customer/CustomerPage";
import { RentPage } from "./features/rent/RentPage";

export function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Rent-a-car
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/vehicles">
              Vehicles
            </Nav.Link>
            <Nav.Link as={Link} to="/customers">
              Customers
            </Nav.Link>
            <Nav.Link as={Link} to="/rents">
              Rents
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/vehicles">
            <VehiclePage />
          </Route>
          <Route path="/customers">
            <CustomerPage />
          </Route>
          <Route path="/rents">
            <RentPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/vehicles" />
          </Route>
        </Switch>
      </Container>
    </>
  );
}
