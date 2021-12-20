import React, { Component } from 'react'
import DataDisplay from './DataDisplay'
import { getArticleViewed, getArticleLiked, getArticleSaded } from '../../../redux/kpi/actions'
import { connect } from 'react-redux'
import moment from 'moment'

class Communication extends Component {

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
                <DataDisplay loading={this.props.viewed_loading} title="Top des articles vus" data={this.props.article_viewed}/>
                <DataDisplay loading={this.props.liked_loading} title="Top des articles aimés" data={this.props.article_liked} />
                <DataDisplay loading={this.props.saded_loading} title="Top des articles non aimés" data={this.props.article_saded} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        article_viewed: state.kpi.communication.viewed && state.kpi.communication.viewed.result && state.kpi.communication.viewed.result.data,
        viewed_loading: state.kpi.communication.viewed && state.kpi.communication.viewed.loading,
        article_liked: state.kpi.communication.liked && state.kpi.communication.liked.result && state.kpi.communication.liked.result.data,
        liked_loading: state.kpi.communication.liked && state.kpi.communication.liked.loading,
        article_saded: state.kpi.communication.saded && state.kpi.communication.saded.result && state.kpi.communication.saded.result.data,
        saded_loading: state.kpi.communication.saded && state.kpi.communication.saded.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInit: param => {
            dispatch(getArticleViewed(param));
            dispatch(getArticleLiked(param));
            dispatch(getArticleSaded(param))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Communication)