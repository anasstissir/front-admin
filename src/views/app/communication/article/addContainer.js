import Add from './add'
import { connect } from 'react-redux'
import { addArticle, editArticle, getArticleById, getCategoryList } from '../../../../redux/communication/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.communication.list_result && state.communication.list_result['data'],
        isAdded: state.communication.isCompleted,
        isLoading: state.communication['loading'],
        isLoadingForEdit: state.communication.displayed && state.communication.displayed['data'],
        totalItem: state.communication.list_result && state.communication.list_result.headers['x-total-count'],
        toRefresh: state.communication['refresh'],
        toEdit: state.communication.displayed ? state.communication.displayed['data'] : {},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (payload) => dispatch(addArticle(payload)),
        editIem: (payload) => dispatch(editArticle(payload)),
        getById: (id) => dispatch(getArticleById(id)),
        getInitData: () => dispatch(getCategoryList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)