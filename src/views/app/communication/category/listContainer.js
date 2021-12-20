import List from '../list'
import { connect } from 'react-redux'
import { getCategoryList, deleteCategory } from '../../../../redux/communication/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.communication.list_result && state.communication.list_result['data'],
        isLoading: state.communication['loading'],
        totalItem: state.communication.list_result && state.communication.list_result.headers['x-total-count'],
        toRefresh: state.communication['refresh']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getList: (params) => dispatch(getCategoryList(params)),
        delete: (id) => dispatch(deleteCategory(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)