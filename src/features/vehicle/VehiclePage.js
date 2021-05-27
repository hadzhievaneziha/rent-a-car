import React from "react";
import { Switch, Route } from "react-router-dom";

import { VehicleCreatePage } from "./VehicleCreatePage";
import { VehicleEditPage } from "./VehicleEditPage";
import { VehicleIndexPage } from "./VehicleIndexPage";
import { VehicleShowPage } from "./VehicleShowPage";

export function VehiclePage() {
  return (
    <Switch>
      <Route path="/vehicles/create">
        <VehicleCreatePage />
      </Route>
      <Route exact path="/vehicles">
        <VehicleIndexPage />
      </Route>
      <Route exact path="/vehicles/:id">
        <VehicleShowPage />
      </Route>
      <Route exact path="/vehicles/:id/edit">
        <VehicleEditPage />
      </Route>
    </Switch>
  );
}
