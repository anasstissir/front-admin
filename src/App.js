import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { isMultiColorActive, isDemo } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }



  render() {
    const { locale, loginUser, isAuthenticated } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}

            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <PublicRoute
                    path="/user"
                    isAuthenticated={isAuthenticated}
                  >
                    <ViewUser {...this.props} />
                  </PublicRoute>
                  <PrivateRoute
                    path="/app"
                    isAuthenticated={isAuthenticated}
                  >
                    <ViewApp {...this.props} />
                    </PrivateRoute>
                  <PrivateRoute
                    path="/"
                    isAuthenticated={isAuthenticated}
                  >
                    <ViewMain {...this.props} />
                  </PrivateRoute>
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { locale } = state.settings;
  return {
    isAuthenticated: state.authUser.user,
    loginUser: state.authUser.user,
    token: state.authUser.user,
    locale
  };
};
const mapActionsToProps = {

};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
