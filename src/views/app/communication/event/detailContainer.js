import Detail from './detailAdvaned'
import { connect } from 'react-redux'
import { urlPath } from "../../../../constants/defaultValues";
import { addArticle, editArticle, getEventById, distruct, publishEvent, notifyEvent } from '../../../../redux/communication/actions'

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
        getById: (id) => dispatch(getEventById(id)),
        distruct: () => dispatch(distruct()),
        publish: (id) => dispatch(publishEvent(id)),
        notify: (id) => dispatch(notifyEvent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)