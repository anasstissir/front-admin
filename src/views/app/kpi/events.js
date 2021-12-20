import React, { Component } from 'react'
import DataDisplay from './DataDisplay'
import { getEventLiked, getEventParticiped, getEventViewed, getEventSaded } from '../../../redux/kpi/actions'
import { connect } from 'react-redux'
import moment from 'moment'

class Events extends Component {

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
                <DataDisplay loading={this.props.viewed_loading} title="Top des événements vus" data={this.props.events_viewed}/>
                <DataDisplay loading={this.props.viewed_loading} title="Top des événements coté participation" data={this.props.events_participed}/>
                <DataDisplay loading={this.props.liked_loading} title="Top des événements aimés" data={this.props.events_liked} />
                {/* <DataDisplay loading={this.props.saded_loading} title="Top des événements non aimés" data={this.props.events_saded} /> */}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events_viewed: state.kpi.events.viewed && state.kpi.events.viewed.result && state.kpi.events.viewed.result.data,
        viewed_loading: state.kpi.events.viewed && state.kpi.events.viewed.loading,
        events_liked: state.kpi.events.liked && state.kpi.events.liked.result && state.kpi.events.liked.result.data,
        liked_loading: state.kpi.events.liked && state.kpi.events.liked.loading,
        events_saded: state.kpi.events.saded && state.kpi.events.saded.result && state.kpi.events.saded.result.data,
        saded_loading: state.kpi.events.saded && state.kpi.events.saded.loading,
        events_participed: state.kpi.events.participed && state.kpi.events.participed.result && state.kpi.events.participed.result.data,
        participed_loading: state.kpi.events.participed && state.kpi.events.participed.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInit: param => {
            dispatch(getEventLiked(param));
            dispatch(getEventViewed(param));
            dispatch(getEventParticiped(param));
           // dispatch(getEventSaded(param));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Events)