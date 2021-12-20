import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import ListContainer from "./listContainer";
 
export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {

      orderOptions: [
        { column: "title", label: "Titre" },
        { column: "createdDate", label: "Date de création" },
        { column: "status", label: "Status" }
      ],

      selectedOrderOption: { column: "title", label: "Titre" },
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
              advanced
              orderOptions={this.state.orderOptions}
              selectedOrderOption={this.state.selectedOrderOption}
              changeOrderBy={this.changeOrderBy}
              heading="menu.event"
              match={this.props.match} />
            {/* <UserCardBasic data={{name: "Anass", status: "Actif", thumb:"https://gogo-react.coloredstrategies.com/assets/img/cards/thumb-1.jpg" }} /> */}
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

