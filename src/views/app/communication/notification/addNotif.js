import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import Add from "../add";
import { withRouter } from "react-router-dom";

class AddNotif extends Component {

  componentDidMount() {
    this.props.getInitData()
    if (this.props.editable) {
      const idCode = new URLSearchParams(this.props.location.search);
      const id = idCode.get('id');
      this.props.get(id)
    }
  }

  render() {
    return (
      <>
        { this.props.isLoading ?
          <div className="loading" />
          :
          <Fragment>
            {this.props.isAdded &&
              this.props.history.goBack()
            }
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="menu.add" match={this.props.match} />
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <Row>

                </Row>
                <Add
                  add={this.props.add}
                  clubs={this.props.clubs}
                  comm_list={this.props.comm_list}
                  editable={this.props.editable}
                  notif
                  match={this.props.match} />
              </Colxx>
            </Row>
          </Fragment>
        }
      </>
    )
  }
}

export default withRouter(AddNotif)