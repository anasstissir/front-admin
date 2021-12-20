import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Events from './events';
import Detail from './detailContainer'
import Add from './addContainer'
const ArticlePage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
    <Route
        path={`${match.url}/detail`}
        render={props => <Detail {...props} />}
      />
      <Route
        path={`${match.url}/add`}
        render={props => <Add {...props} />}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => <Add edit {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={props => <Events {...props} />}
      />
    </Switch>
  </Suspense>
);
export default ArticlePage;
