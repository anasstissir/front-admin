import classnames from "classnames";
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import {
    Card,
    Nav,
    NavItem, Row,
    TabContent,
    TabPane
} from "reactstrap";
import { Colxx } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../helpers/IntlMessages";
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import RecentOrders from '../../../containers/dashboards/RecentOrders';
import Logs from '../../../containers/dashboards/Logs';
import Tickets from '../../../containers/dashboards/Tickets';
import Calendar from '../../../containers/dashboards/Calendar';
import BestSellers from '../../../containers/dashboards/BestSellers';
import ProfileStatuses from '../../../containers/dashboards/ProfileStatuses';
import GradientCardContainer from '../../../containers/dashboards/GradientCardContainer';
import Cakes from '../../../containers/dashboards/Cakes';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';
import SortableStaticticsRow from '../../../containers/dashboards/SortableStaticticsRow';
import AdvancedSearch from '../../../containers/dashboards/AdvancedSearch';
import SmallLineCharts from '../../../containers/dashboards/SmallLineCharts';
import SalesChartCard from '../../../containers/dashboards/SalesChartCard';
import ProductCategoriesPolarArea from '../../../containers/dashboards/ProductCategoriesPolarArea';
import WebsiteVisitsChartCard from '../../../containers/dashboards/WebsiteVisitsChartCard';
import ConversionRatesChartCard from '../../../containers/dashboards/ConversionRatesChartCard';
import TopRatedItems from '../../../containers/dashboards/TopRatedItems';
import DatePickerItem from "./utils";
import IconCard from "../../../components/cards/IconCard";
import DataDisplay from "./DataDisplay";
import Communication from "./communication";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import Events from "./events";
import Faq from "./faq";
import User from "./user";



class DetailsPages extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",
            showModal: false,
            typeAction: null,
            dateRange: ['', ''],
            startDate: moment().subtract(1, 'months'),
            startDateTime: null,
            startDateRange: null,
            endDate: moment(),
        };
    }

    componentDidMount() {
        this.props.getInit()
    }

    componentDidUpdate(prevProps, prevState) {
    }
    toggle = (type) => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
            typeAction: type
        }));
    };
    action = () => {
        switch (this.state.typeAction) {
            case 'publish':
                return this.props.publish(this.props.displayed.id)
            case 'notify':
                return this.props.notify(this.props.displayed.id)
            default:
                return

        }
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }
    render() {
        const { messages } = this.props.intl;
        const [startDate, endDate] = this.state.dateRange;

        return (
            false ?
                (<div className="loading" />)
                :
                <Fragment>
                    <Row>
                        <Colxx xxs="12">
                            <h1>KPIs</h1>
                            <div className="text-zero top-right-button-container">
                            </div>

                            <Breadcrumb match={this.props.match} />

                            <Row>
                                <Colxx lg="12" xl="7">

                                    <Row className="mb-5">
                                        <Colxx xxs="6">
                                            <DatePicker
                                                selected={this.state.startDate}
                                                selectsStart
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                onChange={(date) => this.setState({ startDate: date })}
                                                placeholderText={"start"} />
                                        </Colxx>
                                        <Colxx xxs="6">
                                            <DatePicker
                                                selected={this.state.endDate}
                                                selectsEnd
                                                startDate={this.state.startDate}
                                                endDate={this.state.endDate}
                                                onChange={(date) => this.setState({ endDate: date })}
                                                placeholderText={"end"} />
                                        </Colxx>
                                    </Row>

                                    <Row className="icon-cards-row mb-2 ">
                                        <Colxx sm="4">
                                            <IconCard
                                                icon="iconsminds-check"
                                                title="pages.sondage-published"
                                                value={this.props.sum_survey && this.props.sum_survey.data}
                                            />
                                        </Colxx>
                                        <Colxx sm="4">
                                            <IconCard
                                                icon="simple-icon-support"
                                                title="pages.faq-published"
                                                value={this.props.sum_faq && this.props.sum_faq.data}
                                            />
                                        </Colxx>
                                        <Colxx sm="4">
                                            <IconCard
                                                icon="simple-icon-user-following"
                                                title="pages.user-actif"
                                                value={this.props.sum_user && this.props.sum_user.data}
                                            />
                                        </Colxx>
                                        <Colxx sm="6">
                                            <IconCard
                                                icon="simple-icon-book-open"
                                                title="pages.comm-published"
                                                value={this.props.sum_comm && this.props.sum_comm.data}
                                            />
                                        </Colxx>

                                        <Colxx sm="6">
                                            <IconCard
                                                icon="iconsminds-calendar-4"
                                                title="pages.event-published"
                                                value={this.props.sum_event && this.props.sum_event.data}
                                            />
                                        </Colxx>
                                    </Row>

                                    <Row>
                                        <Colxx md="12" className="mb-4">

                                            <SalesChartCard title={<IntlMessages id="dashboards.visit-app" />} />
                                        </Colxx>
                                    </Row>
                                    <Row>
                                        <Colxx md="12" className="mb-4">

                                        <SalesChartCard title={<IntlMessages id="dashboards.visit-bot" />} />
                                        </Colxx>
                                    </Row>
                                </Colxx>
                                <Colxx lg="12" xl="5" className="mb-4">

                                    <Nav tabs className="separator-tabs ml-0 mb-5">
                                        <NavItem>
                                            <NavLink
                                                location={{}}
                                                to={this.props.location}
                                                className={classnames({
                                                    active: this.state.activeFirstTab === "1",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleTab("1");
                                                }}
                                            >
                                                <IntlMessages id="pages.communication" />
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                location={{}}
                                                to={this.props.location}
                                                className={classnames({
                                                    active: this.state.activeFirstTab === "2",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleTab("2");
                                                }}
                                            >
                                                <IntlMessages id="pages.events" />
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                location={{}}
                                                to={this.props.location}
                                                className={classnames({
                                                    active: this.state.activeFirstTab === "3",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleTab("3");
                                                }}
                                            >
                                                <IntlMessages id="pages.users" />
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                location={{}}
                                                to={this.props.location}
                                                className={classnames({
                                                    active: this.state.activeFirstTab === "4",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleTab("4");
                                                }}
                                            >
                                                <IntlMessages id="pages.survey" />
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                location={{}}
                                                to={this.props.location}
                                                className={classnames({
                                                    active: this.state.activeFirstTab === "5",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleTab("5");
                                                }}
                                            >
                                                <IntlMessages id="pages.faq" />
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                location={{}}
                                                to={this.props.location}
                                                className={classnames({
                                                    active: this.state.activeFirstTab === "6",
                                                    "nav-link": true
                                                })}
                                                onClick={() => {
                                                    this.toggleTab("6");
                                                }}
                                            >
                                                <IntlMessages id="pages.bot" />
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={this.state.activeFirstTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Colxx xxs="12" className="mb-4">
                                                    <Communication startDate={this.state.startDate} endDate={this.state.endDate} />
                                                </Colxx>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Card className="mb-4">
                                                <Events startDate={this.state.startDate} endDate={this.state.endDate} />
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <Card className="mb-4">
                                                <User startDate={this.state.startDate} endDate={this.state.endDate} />
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="4">
                                            <Card className="mb-4">
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="5">
                                            <Card className="mb-4">
                                                <Faq startDate={this.state.startDate} endDate={this.state.endDate} />
                                            </Card>
                                        </TabPane>
                                        <TabPane tabId="6">
                                            <Card className="mb-4">
                                            </Card>
                                        </TabPane>
                                    </TabContent>
                                </Colxx>
                            </Row>
                        </Colxx>
                    </Row>
                </Fragment>
        );
    }
}
export default injectIntl(DetailsPages);
