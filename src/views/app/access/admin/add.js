import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import FormikCustomComponents from '../../../../containers/form-validations/FormikCustomComponents'
import { addUser, editUser, getUserById } from '../../../../redux/access/actions'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

const filter_article = (search) => {
    const params = new URLSearchParams(search);
    const user_id = parseInt(params.get('user_id'));
    return user_id
}


const Add = (props) => {

    let history = useHistory()

    useEffect(() => {
        if (props.edit) {
            props.get(filter_article(props.location.search))
        }
    }, [])

    return (
        <div>
            {props.isLoading ?
                <div className="loading" />
                :
                <>
                    {props.isAdded &&
                        history.goBack()
                    }
                    <h2 className="mb-4">{props.edit ? 'Modifier l\'admin' : 'Ajouter nouveau admin'}</h2>
                    <FormikCustomComponents
                        image
                        onAddUser={(user) => props.addUser(user)}
                        editUser={(user) => props.editUser(user)}
                        edit={props.edit}
                        toEdit={props.toEdit}
                    />
                </>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        redirect: state.route.location,
        isLoading: state.access.loading,
        isAdded: state.access.isCompleted,
        toEdit: state.access.toEdit && state.access.toEdit['data']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => dispatch(addUser(user)),
        editUser: user => dispatch(editUser(user)),
        get: id => dispatch(getUserById(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Add)
