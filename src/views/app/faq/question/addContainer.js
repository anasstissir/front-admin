import Add from './add'
import { connect } from 'react-redux'
import { addQuestion, editQueestion , getSubSectionList, getQuestionById} from '../../../../redux/faq/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.faq.list_result && state.faq.list_result['data'],
        isAdded: state.faq.isCompleted,
        isLoading: state.faq['loading'],
        totalItem: state.faq.list_result && state.faq.list_result.headers['x-total-count'],
        toRefresh: state.faq['refresh'],
        toEdit: state.faq.toEdit ? state.faq.toEdit['data'] : {},
        isLoadingForEdit: state.faq.toEdit && state.faq.toEdit['data']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (payload) => dispatch(addQuestion(payload)),
        edit: (payload) => dispatch(editQueestion(payload)),
        get: (payload) => dispatch(getQuestionById(payload)),
        getInitData: () => dispatch(getSubSectionList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)