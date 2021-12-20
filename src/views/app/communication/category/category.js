import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import ListContainer from "./listContainer";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {

      orderOptions: [
        { column: "categoryName", label: "Nom de catégorie" },
        { column: "createdDate", label: "Date de création" }
      ],

      selectedOrderOption: { column: "categoryName", label: "Nom de catégorie" },
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
            <ListContainer
              orderOptions={this.state.orderOptions}
              selectedOrderOption={this.state.selectedOrderOption}
              changeOrderBy={this.changeOrderBy}
              heading="menu.category"
              match={this.props.match} />
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}
