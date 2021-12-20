import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";
import {LineChart} from "../../components/charts"

import { lineChartData } from "../../data/charts";

const SalesChartCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          {props.title}
        </CardTitle>
        <div className="dashboard-line-chart">
          <LineChart shadow data={lineChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesChartCard;
