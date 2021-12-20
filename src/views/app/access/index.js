import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './admin/index')
);

const User = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './user/index')
);

const Editor = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './editor/index')
);
const AdminPage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/gestion-admin`}
        render={props => <Admin heading="menu.gestion-admin" {...props} />}
      />
      <Route
        path={`${match.url}/gestion-user`}
        render={props => <User heading="menu.gestion-user" {...props} />}
      />
      <Route
        path={`${match.url}/gestion-editor`}
        render={props => <Editor heading="menu.gestion-editor" {...props} />}
      />
    </Switch>
  </Suspense>
);
export default AdminPage;
