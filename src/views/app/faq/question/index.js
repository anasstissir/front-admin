import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Section from './section';
import Add from './addContainer'

const CategoryPage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/add`}
        render={props => <Add {...props} />}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => <Add editable {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={props => <Section {...props} />}
      />
    </Switch>
  </Suspense>
);
export default CategoryPage;
