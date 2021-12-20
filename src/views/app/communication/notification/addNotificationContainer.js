import AddNotif from './addNotif'
import { connect } from 'react-redux'
import { addNotification, editNotif, getNotificationById } from '../../../../redux/communication/actions'

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
        add: (payload) => dispatch(addNotification(payload)),
        edit: (payload) => dispatch(editNotif(payload)),
        get: (payload) => dispatch(getNotificationById(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotif)