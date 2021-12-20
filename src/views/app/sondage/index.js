import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const Sondage = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './sondages')
);

const Details = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './detailContainer')
);

const Add = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './addContainer')
);

const Result = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './surveyResultContainer')
);

const CommunicationPage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Route
      exact
      path={`${match.url}/add`}
      render={props => <Add {...props} />}
    />

<Route
      exact
      path={`${match.url}/edit`}
      render={props => <Add editable {...props} />}
    />

    <Route
      exact
      path={`${match.url}/detail`}
      render={props => <Result {...props} />}
    />

<Route
      exact
      path={`${match.url}/preview`}
      render={props => <Details {...props} />}
    />


    <Route
      exact
      path={`${match.url}`}
      render={props => <Sondage {...props} />}
    />
  </Suspense>
);
export default CommunicationPage;
