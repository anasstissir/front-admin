import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { Row, Card, CardBody, Jumbotron, Button } from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import UserCardExamples from "../../../../containers/ui/UserCardExamples";
import { Role } from './constant'
import { getAdminList } from '../../../../redux/access/actions'

const filter_user = (search, collection = []) => {
    const params = new URLSearchParams(search);
    const user_id = parseInt(params.get('user_id'));
    return collection.find(item => item['id'] === user_id)
}
class Detail extends Component {

    componentDidMount() {
        let role = ''
        if (this.props.user) {
            role = Role.all_user
        } else {
            if (this.props.editor) {
                role = Role.all_editor
            } else {
                role = Role.all_admin
            }
        }
        this.props.getAdminList(role)
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading={this.props.heading} match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row></Row>
                <UserCardExamples user={filter_user(this.props.location.search, this.props.users)} />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.access.list_admin && state.access.list_admin['data'],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminList: params => dispatch(getAdminList(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)