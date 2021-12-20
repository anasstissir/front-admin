import Result from './surveyResult'
import { connect } from 'react-redux'
import { urlPath } from "../../../constants/defaultValues";
import { getSurveyResult, distruct } from '../../../redux/sondage/actions'

const mapStateToProps = state => {

    return {
        comm_list: state.sondage.list_result && state.sondage.list_result['data'],
        isAdded: state.sondage.isCompleted,
        isLoading: state.sondage['loading'],
        totalItem: state.sondage.list_result && state.sondage.list_result.headers['x-total-count'],
        toRefresh: state.sondage['refresh'],
        toEdit: state.sondage.toEdit && state.sondage.toEdit['data'],
        displayed: state.sondage.displayed && state.sondage.displayed['data']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getById: (id) => dispatch(getSurveyResult(id)),
        distruct: () => dispatch(distruct()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result)