import Add from './add'
import { connect } from 'react-redux'
import { addEvent, getEventById, publishEvent, notifyEvent, editEvent } from '../../../../redux/communication/actions'

const mapStateToProps = state => {
    return {
        comm_list: state.communication.list_result && state.communication.list_result['data'],
        isAdded: state.communication.isCompleted,
        isLoadingForEdit: state.communication.displayed && state.communication.displayed['data'],
        isLoading: state.communication['loading'],
        totalItem: state.communication.list_result && state.communication.list_result.headers['x-total-count'],
        toRefresh: state.communication['refresh'],
        toEdit: state.communication.displayed ? state.communication.displayed['data'] : {},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (payload) => dispatch(addEvent(payload)),
        getById: (id) => dispatch(getEventById(id)),
        editIem: (payload) => dispatch(editEvent(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)