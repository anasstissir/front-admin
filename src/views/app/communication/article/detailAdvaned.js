import React, { Component, Fragment } from "react";
import {
    Row,
    Card,
    CardBody,
    Nav,
    NavItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Rating from "../../../../components/common/Rating";

import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import RadialProgressCard from "../../../../components/cards/RadialProgressCard";
import { injectIntl } from "react-intl";
import SmallLineCharts from "../../../../containers/dashboards/SmallLineCharts";
import WebsiteVisitsChartCard from "../../../../containers/dashboards/WebsiteVisitsChartCard";
import NewComments from "../../../../containers/dashboards/NewComments";
import Orders from "../../../../containers/pages/Orders";
import ReactHtmlParser from 'react-html-parser';
import IconCard from "../../../../components/cards/IconCard";
import moment from 'moment'
import Modal from '../../../util/Modal'
import { urlPath } from '../../../../constants/defaultValues'

const filter_article = (search) => {
    const params = new URLSearchParams(search);
    const user_id = parseInt(params.get('comm_id'));
    return user_id
}

class DetailsPages extends Component {
    constructor(props) {
        super(props);

        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1",
            showModal: false,
            typeAction: null
        };
    }

    componentDidMount() {
        this.props.getById(filter_article(this.props.location.search))
    }

    componentWillUnmount() {
        this.props.distruct()
    }

    componentDidUpdate(prevProps) {
        if (this.props.toRefresh !== prevProps.toRefresh && this.props.toRefresh) {
            this.props.getById(filter_article(this.props.location.search))
        }
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

        return (
            !this.props.displayed || this.props.isLoading ?
                (<div className="loading" />)
                :
                <Fragment>
                    <Modal isOpen={this.state.showModal} close={this.toggle} action={this.action} />
                    <Row>
                        <Colxx xxs="12">
                            <h1>Détail</h1>
                            <div className="text-zero top-right-button-container">
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        color="primary"
                                        size="lg"
                                        outline
                                        className="top-right-button top-right-button-single"
                                    >
                                        <IntlMessages id="pages.actions" />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.toggle("publish")}>
                                            <IntlMessages id="pages.publish" />
                                        </DropdownItem>
                                        <DropdownItem onClick={() => this.toggle("notify")}>
                                            <IntlMessages id="pages.notify" />
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                            <Breadcrumb match={this.props.match} />

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
                                        <IntlMessages id="pages.details" />
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={this.state.activeFirstTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Colxx xxs="12" lg="4" className="mb-4">
                                            <Card className="mb-4">

                                                <CardBody>
                                                    <p className="text-muted text-small mb-2">
                                                        <IntlMessages id="pages.title" />
                                                    </p>
                                                    <p className="mb-3">{this.props.displayed.title || this.props.displayed.name} </p>

                                                    <p className="text-muted text-small mb-2">
                                                        <IntlMessages id="pages.rating" />
                                                    </p>
                                                    <div className="mb-3">
                                                        <Rating total={5} rating={4} interactive={false} />
                                                    </div>
                                                    

                                                    <p className="text-muted text-small mb-2">
                                                        <IntlMessages id="pages.creation-date" />
                                                    </p>
                                                    <p>{moment(this.props.displayed.creationDate).format("DD/MM/YYYY")}</p>

                                                </CardBody>
                                            </Card>
                                        </Colxx>

                                        <Colxx xxs="12" lg="8">
                                            <Row className="icon-cards-row mb-2">
                                                <Colxx sm="3">
                                                    <IconCard
                                                        icon="simple-icon-like"
                                                        title="pages.reaction"
                                                        classNameText="text-small"
                                                        value={this.props.displayed.likesSize || 0}
                                                    />
                                                </Colxx>
                                                <Colxx sm="3">
                                                    <IconCard
                                                        icon="simple-icon-heart"
                                                        title="pages.adore"
                                                        classNameText="text-small"
                                                        value={this.props.displayed.lovesSize || 0}
                                                    />
                                                </Colxx>
                                                <Colxx sm="3">
                                                    <IconCard
                                                        icon="simple-icon-ghost"
                                                        title="pages.sad"
                                                        classNameText="text-small"
                                                        value={this.props.displayed.sadsSize || 0}
                                                    />
                                                </Colxx>
                                                <Colxx sm="3">
                                                    <IconCard
                                                        icon="simple-icon-eye"
                                                        title="pages.view"
                                                        classNameText="text-small"
                                                        value={this.props.displayed.viewsSize || 0}
                                                    />
                                                </Colxx>
                                            </Row>
                                        </Colxx>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Colxx>
                    </Row>
                </Fragment>
        );
    }
}
export default injectIntl(DetailsPages);
