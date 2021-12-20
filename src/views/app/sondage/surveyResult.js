
import React, { Component, Fragment } from "react";
import {
    Row,
    Card,
    CardTitle,
    CardSubtitle,
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

import GradientWithRadialProgressCard from "../../../components/cards/GradientWithRadialProgressCard";
import ProfileStatuses from "../../../components/cards/QuestionStatuses";
import {
    doughnutChartFormat,
    polarAreaChartData,
    areaChartData,
    scatterChartData,
    barChartData,
    radarChartData,
    pieChartData,
    doughnutChartData
} from "../chart/charts";

import {
    DoughnutChart,
    LineChart,
    PolarAreaChart,
    AreaChart,
    ScatterChart,
    BarChart,
    RadarChart,
    PieChart
} from "../../../components/charts";

import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";

const filter_article = (search) => {
    const params = new URLSearchParams(search);
    const user_id = parseInt(params.get('sond_id'));
    return user_id
}

const calculate = (some, total) => {
    if (total === 0) {
        return 0;
    } else {
        return (some / total) * 100;
    }
}

export default class Result extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getById(filter_article(this.props.location.search))
    }




    render() {
        return !this.props.displayed ?
            (<div className="loading" />)
            :
            (
                <Fragment>
                    <Row>
                        <Colxx xxs="12">
                            <Breadcrumb heading="menu.article" match={this.props.match} />
                            <Separator className="mb-5" />
                        </Colxx>
                    </Row>
                    <Row>
                        <Colxx xxs="12" className="mb-4">
                            <Row>
                                <Colxx xxs="4">
                                    <GradientWithRadialProgressCard
                                        icon="iconsminds-male"
                                        title={"Reponse"}
                                        detail={"Nb Reponse"}
                                        percent={100}
                                        progressText={this.props.displayed.numberResponses}
                                    />
                                </Colxx>
                                <Colxx xxs="4">
                                    <GradientWithRadialProgressCard
                                        icon="iconsminds-male"
                                        title={"Visite"}
                                        detail={"Nb de visite"}
                                        percent={100}
                                        progressText={this.props.displayed.numberVisites}
                                    />
                                </Colxx>
                                <Colxx xxs="4">
                                    <GradientWithRadialProgressCard
                                        icon="iconsminds-male"
                                        title={"Taux"}
                                        detail={"Taux d'achevement"}
                                        percent={this.props.displayed.tauxAchevement}
                                        progressText={this.props.displayed.tauxAchevement}
                                    />
                                </Colxx>
                            </Row>
                            <Row className="mb-4">
                                <Colxx sm="12" className="mb-4">

                                </Colxx>
                            </Row>

                            <Row className="mb-4">
                                <Colxx xxs="12">
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Colxx xxs="12" lg="12" className="mb-5">
                                                    <ProfileStatuses questions={this.props.displayed.questions} />
                                                </Colxx>

                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Colxx>
                            </Row>


                            {this.props.displayed.questions && this.props.displayed.questions.map(item => {
                                return (<Row className="mb-4">
                                    <Colxx xxs="12">
                                        <Card>
                                            <CardBody>
                                                <CardTitle>
                                                    {item.title}
                                                </CardTitle>
                                                <Row>
                                                    <Colxx xxs="12" lg="12" className="mb-5">
                                                        <div className="chart-container">
                                                            {item.choicesResponses && <DoughnutChart data={doughnutChartFormat(item.choicesResponses)} />}
                                                            {item.textsResponses && item.textsResponses.map(resp => 
                                                                <p>{resp.textResponse}</p>
                                                            )}
                                                        </div>
                                                    </Colxx>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Colxx>
                                </Row>)
                            })}
                            <Row></Row>
                        </Colxx>
                    </Row>
                </Fragment >

            )
    }
}
