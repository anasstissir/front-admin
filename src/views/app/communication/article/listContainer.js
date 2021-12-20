import List from '../list'
import { connect } from 'react-redux'
import { getArticles, deleteArticle, publishArticle, notifyArticle } from '../../../../redux/communication/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.communication.comm_result && state.communication.comm_result['data'],
        isLoading: state.communication['loading'],
        totalItem: state.communication.comm_result && state.communication.comm_result.headers['x-total-count'],
        toRefresh: state.communication['refresh']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getList: (params) => dispatch(getArticles(params)),
        delete: (id) => dispatch(deleteArticle(id)),
        publish: (id) => dispatch(publishArticle(id)),
        notify: (id) => dispatch(notifyArticle(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)