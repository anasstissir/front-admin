import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "start" */ '../admin/admin')
);
const Add = React.lazy(() =>
  import(/* webpackChunkName: "start" */ '../admin/add')
);
const Detail = React.lazy(() =>
  import(/* webpackChunkName: "start" */ '../admin/detail')
);
const AccountPage = ({ match, heading }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/add`}
        render={props => <Add {...props} />}
      />
      <Route
        path={`${match.url}/detail`}
        render={props => <Detail {...props} editor />}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => <Add {...props} editor edit/>}
      />
      <Route
        path={`${match.url}`}
        render={props => <Admin heading={heading} editor {...props} />}
      />
    </Switch>
  </Suspense>
);
export default AccountPage;
