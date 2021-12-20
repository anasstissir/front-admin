import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Add from './add'
const Admin = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './admin')
);

const Detail = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './detail')
);
const AdminPage = ({ match, heading }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        exact
        path={`${match.url}/add`}
        render={props => <Add {...props} />}
      />
      
      <Route
        exact
        path={`${match.url}/edit`}
        render={props => <Add {...props} edit/>}
      />
      <Route
        exact
        path={`${match.url}/detail`}
        render={props => <Detail {...props} />}
      />
      <Route
        exact
        path={`${match.url}`}
        render={props => <Admin heading={heading} {...props} />}
      />
    </Switch>
  </Suspense>
);
export default AdminPage;
