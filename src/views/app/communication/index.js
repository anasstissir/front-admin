import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Category = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './category/index')
);

const Notification = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './notification/index')
);

const Articles = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './article/index')
);
const Events = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './event/index')
);

const CommunicationPage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/category`}
        render={props => <Category {...props} />}
      />
      <Route
        path={`${match.url}/notification`}
        render={props => <Notification {...props} />}
      />
      <Route
        path={`${match.url}/article`}
        render={props => <Articles advanced {...props} />}
      />      
      <Route
        path={`${match.url}/event`}
        render={props => <Events advanced {...props} />}
      />
    </Switch>
  </Suspense>
);
export default CommunicationPage;
