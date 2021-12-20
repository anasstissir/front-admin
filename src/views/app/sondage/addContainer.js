import Add from './add'
import { connect } from 'react-redux'
import { addSurvey, editSurvey, getSurvey } from '../../../redux/sondage/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.sondage.list_result && state.sondage.list_result['data'],
        isAdded: state.sondage.isCompleted,
        isLoading: state.sondage['loading'],
        totalItem: state.sondage.list_result && state.sondage.list_result.headers['x-total-count'],
        toRefresh: state.sondage['refresh'],
        toEdit: state.sondage.displayed ? state.sondage.displayed['data'] : {},
        token: state.authUser.user && state.authUser.user['id_token'] ? 'Bearer ' +
            state.authUser.user['id_token'] : 'eyJhbGciOiJIUzUxMiJ9',
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (payload) => dispatch(addSurvey(payload)),
        edit: (payload) => dispatch(editSurvey(payload)),
        get: (payload) => dispatch(getSurvey(payload)),
        getInitData: () => dispatch(getSurvey())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)