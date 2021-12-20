import List from '../list'
import { connect } from 'react-redux'
import { getEvents, deleteEvent, publishEvent, notifyEvent } from '../../../../redux/communication/actions'

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
        getList: (params) => dispatch(getEvents(params)),
        delete: (id) => dispatch(deleteEvent(id)),
        publish: (id) => dispatch(publishEvent(id)),
        notify: (id) => dispatch(notifyEvent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)