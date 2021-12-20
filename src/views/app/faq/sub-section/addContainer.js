import Add from './add'
import { connect } from 'react-redux'
import { addSubSection, editSubSection, getSubSectionById, getSectionList } from '../../../../redux/faq/actions'

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
        add: (payload) => dispatch(addSubSection(payload)),
        edit: (payload) => dispatch(editSubSection(payload)),
        get: (payload) => dispatch(getSubSectionById(payload)),
        getInitData: () => dispatch(getSectionList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)