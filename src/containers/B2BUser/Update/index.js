import { connect } from 'react-redux';
import UpdateUser from './UpdateUser';
import { Form } from 'antd';

import { hideUpdateModal, updateUser } from "../../../actions/users";

function mapStateToProps({users}) {
    return {
        updateUserData : users.updateUser.data,
        showModal : users.updateUser.showModel
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onHideModal : (form) => {
            form.resetFields();
            dispatch(hideUpdateModal())
        },

        onUpdateUser : (id, form) => {
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    values.id = id;
                    dispatch(updateUser(values));
                    form.resetFields();
                    dispatch(hideUpdateModal())
                }
            });
        }
    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(UpdateUser))
