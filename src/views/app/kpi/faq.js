import React, { Component } from 'react'
import DataDisplay from './DataDisplay'
import { getFaqFavored } from '../../../redux/kpi/actions'
import { connect } from 'react-redux'
import moment from 'moment'

class Faq extends Component {

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
                <DataDisplay loading={this.props.favored_loading} title="Top des faq favoris" data={this.props.faq_favored}/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        faq_favored: state.kpi.faq.favored && state.kpi.faq.favored.result && state.kpi.faq.favored.result.data,
        favored_loading: state.kpi.faq.favored && state.kpi.faq.favored.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInit: param => {
            dispatch(getFaqFavored(param))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Faq)