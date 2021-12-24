import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import routeReducer from '../../redux/routeReducer';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Access = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './access')
);
const Communication = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './communication')
);
const FAQ = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './faq')
);

const Sondage = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './sondage')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const Notification = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './notificationManager/notification')
);

const Kpi = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './kpi')
);

class App extends Component {

  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Notification>
              <Switch>
                <Redirect
                  exact
                  from={`${match.url}/`}
                  to={`${match.url}/access`}
                />
                {/* <Route
                  path={`${match.url}/kpi`}
                  render={props => <Kpi {...props} />}
                /> */}
                <Route
                  path={`${match.url}/access`}
                  render={props => <Access {...props} />}
                />
                <Route
                  path={`${match.url}/communication`}
                  render={props => <Communication {...props} />}
                />
                {/* <Route
                  path={`${match.url}/communication`}
                  render={props => <Communication {...props} />}
                />
                <Route
                  path={`${match.url}/faq`}
                  render={props => <FAQ {...props} />}
                />
                <Route
                  path={`${match.url}/sondage`}
                  render={props => <Sondage {...props} />}
                /> */}
                <Redirect to="/error" />
              </Switch>
            </Notification>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = (state) => {
  const { containerClassnames } = state.menu;
  return {
    containerClassnames,
    redirect: routeReducer.location
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
