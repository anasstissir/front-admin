import AddCategory from './addCategory'
import { connect } from 'react-redux'
import { addCategory, editCategory, getCategoryList, getCategory } from '../../../../redux/communication/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.communication.list_result && state.communication.list_result['data'],
        isAdded: state.communication.isCompleted,
        isLoading: state.communication['loading'],
        totalItem: state.communication.list_result && state.communication.list_result.headers['x-total-count'],
        toRefresh: state.communication['refresh'],
        toEdit: state.communication.toEdit && state.communication.toEdit['data'],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (category) => dispatch(addCategory(category)),
        getCategoryList: () => dispatch(getCategoryList()),
        edit: (category) => dispatch(editCategory(category)),
        getCategory: (id) => dispatch(getCategory(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)