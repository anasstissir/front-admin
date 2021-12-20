import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Category from './category';
import AddCat from './addCategoryContainer';

const CategoryPage = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
    <Route
        path={`${match.url}/add`}
        render={props => <AddCat {...props} />}
      />
      <Route
        path={`${match.url}/edit`}
        render={props => <AddCat editable {...props} />}
      />
      <Route
        path={`${match.url}`}
        render={props => <Category {...props} />}
      />
    </Switch>
  </Suspense>
);
export default CategoryPage;
