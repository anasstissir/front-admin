import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Articles from './articles';
import Add from './addContainer'
import Detail from './detailContainer'

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
        render={props => <Articles {...props} />}
      />
    </Switch>
  </Suspense>
);
export default ArticlePage;
