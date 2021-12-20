
import * as Survey from "survey-react";
import "survey-react/survey.css";
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
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import Modal from '../../util/Modal'

const filter_article = (search) => {
    const params = new URLSearchParams(search);
    const user_id = parseInt(params.get('sond_id'));
    return user_id
}

export default class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            typeAction: null
        };
    }

    componentDidMount() {
        this.props.getById(filter_article(this.props.location.search))
        let defaultThemeColors = Survey
            .StylesManager
            .ThemeColors["default"];
        defaultThemeColors["$main-color"] = "#8087FE";
        defaultThemeColors["$main-hover-color"] = "#4c51af";
        defaultThemeColors["$text-color"] = "#4a4a4a";
        defaultThemeColors["$header-color"] = "#8087FE";

        defaultThemeColors["$header-background-color"] = "#dddddd";
        defaultThemeColors["$body-container-background-color"] = "#f8f8f8";
        Survey.StylesManager.applyTheme();
    }

    componentDidUpdate(prevProps) {
        if (this.props.toRefresh !== prevProps.toRefresh && this.props.toRefresh) {
            this.props.getById(filter_article(this.props.location.search))
        }
    }

    componentWillUnmount() {
        this.props.distruct()
    }

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
                                <Survey.Survey model={new Survey.Model(this.props.displayed)} />
                            </Row>
                        </Fragment>
                    </Colxx>
                </Row>
            </Fragment >

            )
    }
}
