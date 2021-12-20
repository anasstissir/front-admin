import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Notification from './category';
import AddNotif from './addNotificationContainer'

const CategoryPage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/add`}
        render={props => <AddNotif {...props} />}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => <AddNotif editable {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={props => <Notification {...props} />}
      />
    </Switch>
  </Suspense>
);
export default CategoryPage;
