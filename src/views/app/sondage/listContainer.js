import List from './list'
import { connect } from 'react-redux'
import { getSurveyList, deleteSurvey, publishSurvey, notifySurvey } from '../../../redux/sondage/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.sondage.list_result && state.sondage.list_result['data'],
        isLoading: state.sondage['loading'],
        totalItem: state.sondage.list_result && state.sondage.list_result.headers['x-total-count'],
        toRefresh: state.sondage['refresh']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getList: (params) => dispatch(getSurveyList(params)),
        delete: (id) => dispatch(deleteSurvey(id)),
        notify: (id) => dispatch(notifySurvey(id)),
        publish: (id) => dispatch(publishSurvey(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)