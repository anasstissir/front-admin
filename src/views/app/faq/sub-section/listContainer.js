import List from '../list'
import { connect } from 'react-redux'
import { getSubSectionList, deleteSubSection } from '../../../../redux/faq/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.faq.list_result && state.faq.list_result['data'],
        isLoading: state.faq['loading'],
        totalItem: state.faq.list_result && state.faq.list_result.headers['x-total-count'],
        toRefresh: state.faq['refresh']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getList: (params) => dispatch(getSubSectionList(params)),
        delete: (id) => dispatch(deleteSubSection(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)