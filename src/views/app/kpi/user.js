import React, { Component } from 'react'
import DataDisplay from './DataDisplay'
import { getUserComm, getUserParticipated, getUserEvent } from '../../../redux/kpi/actions'
import { connect } from 'react-redux'
import moment from 'moment'
import DataUser from './dataUser'

class User extends Component {

    componentDidMount() {
        this.props.getInit({ size: 3, startDate: moment(this.props.startDate).format('YYYY-MM-DD'), endDate: moment(this.props.endDate).format('YYYY-MM-DD') })
    }

    componentDidUpdate(prevProps){
        if(prevProps.startDate != this.props.startDate || this.props.endDate != prevProps.endDate){
            this.props.getInit({ size: 3, startDate: moment(this.props.startDate).format('YYYY-MM-DD'), endDate: moment(this.props.endDate).format('YYYY-MM-DD') })
        }
    }

    render() {
        return (
            <>
                <DataUser loading={this.props.users_event_participated_loading} title="Top des participants" data={this.props.users_event_participated}/>
                <DataUser loading={this.props.users_event_view_loading} title="Top des vus pour événements" data={this.props.users_event_view}/>
                <DataUser loading={this.props.users_comm_view_loading} title="Top vus des utilisateurs" data={this.props.users_comm_view}/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users_event_view: state.kpi.users.viewd_event && state.kpi.users.viewd_event.result && state.kpi.users.viewd_event.result.data,
        users_event_view_loading: state.kpi.users.viewd_event && state.kpi.users.viewd_event.loading,
        users_event_participated: state.kpi.users.participed_event && state.kpi.users.participed_event.result && state.kpi.users.participed_event.result.data,
        users_event_participated_loading: state.kpi.users.participed_event && state.kpi.users.participed_event.loading,
        users_comm_view: state.kpi.users.viewd_article && state.kpi.users.viewd_article.result && state.kpi.users.viewd_article.result.data,
        users_comm_view_loading: state.kpi.users.viewd_article && state.kpi.users.viewd_article.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInit: param => {
            dispatch(getUserComm(param));
            dispatch(getUserParticipated(param));
            dispatch(getUserEvent(param))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User)