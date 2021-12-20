import Detail from './detailAdvaned'
import { connect } from 'react-redux'
import { urlPath } from "../../../../constants/defaultValues";
import { notifyArticle, distruct, getArticleById, getCategoryList, deleteArticle, publishArticle } from '../../../../redux/communication/actions'

const mapStateToProps = state => {
    const image = state.communication.displayed &&
        urlPath + '/api/images/' + state.communication.displayed.data['imageDocumentId'] + '/view'

    return {
        comm_list: state.communication.list_result && state.communication.list_result['data'],
        isAdded: state.communication.isCompleted,
        isLoading: state.communication['loading'],
        totalItem: state.communication.list_result && state.communication.list_result.headers['x-total-count'],
        toRefresh: state.communication['refresh'],
        toEdit: state.communication.toEdit && state.communication.toEdit['data'],
        displayed: state.communication.displayed && state.communication.displayed['data'],
        imageDisplayed: image
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getById: (id) => dispatch(getArticleById(id)),
        getInitData: () => dispatch(getCategoryList()),
        distruct: () => dispatch(distruct()),
        delete: (id) => dispatch(deleteArticle(id)),
        publish: (id) => dispatch(publishArticle(id)),
        notify: (id) => dispatch(notifyArticle(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)