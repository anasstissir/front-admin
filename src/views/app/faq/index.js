import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const Section = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './section/index')
);
const Sub = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './sub-section/index')
);
const Question = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './question/index')
);

const CommunicationPage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Route
      path={`${match.url}/section`}
      render={props => <Section {...props} />}
    />
    <Route
      path={`${match.url}/sub-section`}
      render={props => <Sub {...props} />}
    />
    <Route
      path={`${match.url}/question`}
      render={props => <Question {...props} />}
    />
  </Suspense>
);
export default CommunicationPage;
