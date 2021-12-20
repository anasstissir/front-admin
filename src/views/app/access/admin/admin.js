import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import AdminList from "./admin-list";
 
export default class Admin extends Component {
    render() {
        return (
            <Fragment>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <Row>
                  
                </Row>
                <AdminList heading={this.props.heading} user={this.props.user} editor={this.props.editor} match={this.props.match}/>
                {/* <UserCardBasic data={{name: "Anass", status: "Actif", thumb:"https://gogo-react.coloredstrategies.com/assets/img/cards/thumb-1.jpg" }} /> */}
              </Colxx>
            </Row>
          </Fragment>
        )
    }
}
