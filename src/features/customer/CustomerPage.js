import React from "react";
import { Switch, Route } from "react-router-dom";

import { CustomerCreatePage } from "./CustomerCreatePage";
import { CustomerEditPage } from "./CustomerEditPage";
import { CustomerIndexPage } from "./CustomerIndexPage";
import { CustomerShowPage } from "./CustomerShowPage";

export function CustomerPage() {
  return (
    <Switch>
      <Route path="/customers/create">
        <CustomerCreatePage />
      </Route>
      <Route exact path="/customers">
        <CustomerIndexPage />
      </Route>
      <Route exact path="/customers/:id">
        <CustomerShowPage />
      </Route>
      <Route exact path="/customers/:id/edit">
        <CustomerEditPage />
      </Route>
    </Switch>
  );
}
