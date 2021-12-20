import Avatar from '@material-ui/core/Avatar';
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  DropdownItem,

  DropdownMenu, DropdownToggle, UncontrolledDropdown
} from "reactstrap";
import { MenuIcon, MobileMenuIcon } from "../../components/svg";
import {
  isDarkSwitchActive, localeOptions,

  urlPath
} from "../../constants/defaultValues";
import { getDirection, setDirection } from "../../helpers/Utils";
import {
  changeLocale, clickOnMobileMenu,
  logoutUser, setContainerClassnames
} from "../../redux/actions";
import TopnavDarkSwitch from "./Topnav.DarkSwitch";
import TopnavNotifications from "./Topnav.Notifications";
import { withStyles } from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    '& > *': {
      margin: theme.spacing(1.5),
    },
    
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
});

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
    };
  }

  componentDidUpdate(prevProps){
    if(this.props.user !== prevProps.user && this.props.user === null){
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    }
  }

  handleChangeLocale = (locale, direction) => {
    this.props.changeLocale(locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };

  render() {
    const { containerClassnames, menuClickCount, locale, classes } = this.props;
    const { messages } = this.props.intl;
    return (
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={e =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={e => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>


          <div className="d-inline-block">
            <UncontrolledDropdown className="ml-2">
              <DropdownToggle
                caret
                color="light"
                size="sm"
                className="language-button">
                <span className="name">{locale.toUpperCase()}</span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {localeOptions.map(l => {
                  return (
                    <DropdownItem
                      onClick={() => this.handleChangeLocale(l.id, l.direction)}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        {/* <a className="navbar-logo" href="/">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a> */}

        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}
          <div className="user d-inline-block">
            {this.props.user && <UncontrolledDropdown className="dropdown-menu-right">

              <span className="name mr-1">{this.props.user.firstName} {this.props.user.lastName}</span>
              <DropdownToggle className="p-0" color="empty">
                <Avatar className={classes.small}  alt={this.props.user.firstName + ' ' + this.props.user.lastName} src={urlPath + '/api/images/' + this.props.user.photoDocument + '/view'} />
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
              <DropdownItem
                  onClick={() => this.props.history.push("/user/change-password")}
                >
                  Réinitialiser le mot de passe
                </DropdownItem>
                <DropdownItem onClick={() => this.handleLogout()}>
                  Se déconnecter
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = state.menu;
  const { locale } = state.settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    user: state.authUser.user && state.authUser.user.principal
  };
};
export default injectIntl(
  connect(
    mapStateToProps,
    { setContainerClassnames, clickOnMobileMenu, logoutUser, changeLocale }
  )(withStyles(styles)(TopNav))
);
