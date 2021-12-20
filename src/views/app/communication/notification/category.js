import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import ListContainer from "./listContainer";
 
export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {

      orderOptions: [
        { column: "title", label: "Titre" },
        { column: "createdDate", label: "Date de création" }
      ],

      selectedOrderOption: { column: "createdDate", label: "Date de création" },
    };
  }

  changeOrderBy = (column) => {
    this.setState({
      selectedOrderOption: this.findObjectByColumn(column)
    })
  }

  findObjectByColumn = (column) => {
    return this.state.orderOptions.find(item => item.column === column)
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Row>

            </Row>
            <ListContainer
            notification
              orderOptions={this.state.orderOptions}
              selectedOrderOption={this.state.selectedOrderOption}
              changeOrderBy={this.changeOrderBy}
              heading="menu.notification"
              match={this.props.match} />
            {/* <UserCardBasic data={{name: "Anass", status: "Actif", thumb:"https://gogo-react.coloredstrategies.com/assets/img/cards/thumb-1.jpg" }} /> */}
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

