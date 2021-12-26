import React, { Component, Fragment } from "react";
import {
    Row,
    Card,
    CardTitle,
    CardBody,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    Badge,
    CardHeader,
    Table,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import GlideComponentThumbs from "../../../../components/carousel/GlideComponentThumbs";
import { detailImages, detailThumbs } from "../../../../data/carouselItems";
import { detailsQuestionsData } from "../../../../data/questions";
import CommentWithLikes from "../../../../components/pages/CommentWithLikes";
import { commentWithLikesData } from "../../../../data/comments";
import QuestionAnswer from "../../../../components/pages/QuestionAnswer";
import Avatar from '@material-ui/core/Avatar';
import { urlPath } from "../../../../constants/defaultValues";
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment'
import { MiniCard } from '../utils'
import MediaCard from '../cardImage'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import IconCard from "../../../../components/cards/IconCard";
import ReactHtmlParser from 'react-html-parser';
import Modal from '../../../util/Modal'

const filter_article = (search) => {
    const params = new URLSearchParams(search);
    const user_id = parseInt(params.get('comm_id'));
    return user_id
}

export default class Articles extends Component {

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

    componentDidUpdate(prevProps) {
        if (this.props.toRefresh !== prevProps.toRefresh && this.props.toRefresh) {
            this.props.getById(filter_article(this.props.location.search))
        }
    }

    componentWillUnmount() {
        this.props.distruct()
    }

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
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

    toggleTab = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }

    render() {
        return !this.props.displayed ?
            (<div className="loading" />)
            :
            (<Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.article" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Modal isOpen={this.state.showModal} close={this.toggle} action={this.action} />
                    <Colxx xxs="12" className="mb-4">
                        <Fragment>
                            <Row>
                                <Colxx xxs="12">
                                    <Row>
                                        <Colxx xxs="6"></Colxx>
                                        <Colxx xxs="6">
                                            <div className="top-right-button float-right mb-2">
                                                <Button
                                                    color="success"
                                                    onClick={() => this.toggle("publish")}
                                                    className="top-right-button ">
                                                    <IntlMessages id="pages.publish" />
                                                </Button>
                                                {"  "}
                                                <Button
                                                    color="info"
                                                    onClick={() => this.toggle("notify")}
                                                    className="top-right-button ">
                                                    <IntlMessages id="pages.notify" />
                                                </Button>

                                            </div>
                                        </Colxx>
                                        <Colxx xxs="12" xl="12" className="col-left">
                                            <Card className="mb-4">
                                                <CardBody>
                                                    <MediaCard
                                                        image={this.props.imageDisplayed}
                                                        alt={this.props.displayed.title}
                                                    />
                                                </CardBody>
                                            </Card>
                                            <Card className="mb-4">
                                                <CardHeader>
                                                    <Nav tabs className="card-header-tabs ">
                                                        <NavItem>
                                                            <div
                                                                className={classnames({
                                                                    active: this.state.activeFirstTab === "1",
                                                                    "nav-link": true
                                                                })}
                                                                onClick={() => { this.toggleTab("1"); }}>
                                                                <IntlMessages id="pages.details-title" />
                                                            </div>
                                                        </NavItem>
                                                        <NavItem>
                                                            <div
                                                                className={classnames({
                                                                    active: this.state.activeFirstTab === "2",
                                                                    "nav-link": true
                                                                })}
                                                                onClick={() => { this.toggleTab("2"); }}>
                                                                <IntlMessages id="pages.details-publication" />
                                                            </div>
                                                        </NavItem>
                                                        <NavItem>
                                                            <div
                                                                className={classnames({
                                                                    active: this.state.activeFirstTab === "3",
                                                                    "nav-link": true
                                                                })}
                                                                onClick={() => { this.toggleTab("3"); }}>
                                                                <IntlMessages id="pages.attachment" />
                                                            </div>
                                                        </NavItem>
                                                    </Nav>
                                                </CardHeader>

                                                <TabContent activeTab={this.state.activeFirstTab}>
                                                    <TabPane tabId="1">
                                                        <Row>
                                                            <Colxx sm="12">
                                                                <CardBody>
                                                                    <h2 className="font-weight-bold">{this.props.displayed.title}
                                                                        <IconButton aria-label="edit">
                                                                            <EditIcon fontSize="small" color="primary" />
                                                                        </IconButton>
                                                                    </h2>
                                                                    <br />
                                                                    <p>{ReactHtmlParser(this.props.displayed.content)}</p>
                                                                    <br />
                                                                    <Row>
                                                                        <Colxx sm="12">
                                                                            <MiniCard
                                                                                className="d-flex flex-row mb-3 pb-3 float-right"
                                                                                component={<Avatar alt={this.props.displayed.authorFirstName + ' ' + this.props.displayed.authorLastName} src={urlPath + '/api/images/' + this.props.displayed.authorPhotoDocumentId + '/view'} />}
                                                                                header={this.props.displayed.authorFirstName + ' ' + this.props.displayed.authorLastName}
                                                                                sub={moment(this.props.displayed.createdDate).format("DD/MM/YYYY")}
                                                                            />
                                                                        </Colxx>
                                                                    </Row>
                                                                    <Row className="icon-cards-row mb-2">
                                                                        <Colxx sm="3">
                                                                            <IconCard
                                                                                icon="iconsminds-chair"
                                                                                title="pages.participation"
                                                                                classNameText="text-small"
                                                                                value={this.props.displayed.maxPlacesNumber || 0}
                                                                            />
                                                                        </Colxx>
                                                                        <Colxx sm="3">
                                                                            <IconCard
                                                                                icon="iconsminds-file-clipboard"
                                                                                title="pages.registration"
                                                                                classNameText="text-small"
                                                                                value={this.props.displayed.registrationsSize || 0}
                                                                            />
                                                                        </Colxx>
                                                                        <Colxx sm="3">
                                                                            <IconCard
                                                                                icon="iconsminds-conference"
                                                                                title="pages.participants"
                                                                                classNameText="text-small"
                                                                                value={this.props.displayed.participationsSize || 0}
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
                                                                    <Row className="icon-cards-row mb-2">
                                                                        <Colxx sm="4">
                                                                            <IconCard
                                                                                icon="iconsminds-location-2"
                                                                                title="pages.location"
                                                                                classNameText="text-small"
                                                                                value={this.props.displayed.eventAdress}
                                                                            />
                                                                        </Colxx>
                                                                        <Colxx sm="4">
                                                                            <IconCard
                                                                                icon="iconsminds-calendar-4"
                                                                                title="pages.time"
                                                                                classNameText="text-small"
                                                                                value={moment(this.props.displayed.startDateTime).format("DD/MM/YYYY HH:mm") + ' -> ' + moment(this.props.displayed.endDateTime).format("DD/MM/YYYY HH:mm")}
                                                                            />
                                                                        </Colxx>
                                                                        <Colxx sm="4">
                                                                            <IconCard
                                                                                icon="simple-icon-like"
                                                                                title="pages.reaction"
                                                                                classNameText="text-small"
                                                                                value={this.props.displayed.likesSize || 0}
                                                                            />
                                                                        </Colxx>
                                                                    </Row>
                                                                </CardBody>
                                                            </Colxx>
                                                        </Row>
                                                    </TabPane>
                                                </TabContent>
                                            </Card>

                                        </Colxx>
                                    </Row>
                                </Colxx>
                            </Row>
                        </Fragment>
                    </Colxx>
                </Row>
            </Fragment >

            )
    }
}
