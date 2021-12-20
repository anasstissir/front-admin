import { connect } from 'react-redux'
import Global from './global'
import {getCountComm, getCountEvent, getCountFaq, getCountSurvey, getCountUser} from '../../../redux/kpi/actions'

const mapStateToProps = (state) => {
    return {
        sum_user: state.kpi.actif_user,
        sum_comm: state.kpi.sum_comm,
        sum_faq: state.kpi.sum_faq,
        sum_event: state.kpi.sum_event,
        sum_survey: state.kpi.sum_survey
    }
}

const mapDistpashToProps = (dispatch) => {
    return {
        getInit: () => {
            dispatch(getCountComm());
            dispatch(getCountEvent());
            dispatch(getCountFaq());
            dispatch(getCountSurvey());
            dispatch(getCountUser())
        },
    }
}

export default connect(mapStateToProps, mapDistpashToProps)(Global)