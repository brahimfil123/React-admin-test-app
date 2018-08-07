import { connect } from 'react-redux';
import UpdateAdmin from './UpdateAdmin';
import { Form } from 'antd';

import { hideUpdateModal, updateAdmin } from "../../../actions/admins";

function mapStateToProps({admin}) {
    return {
        updateAdminData : admin.updateAdmin.data,
        showModal : admin.updateAdmin.showModel
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onHideModal : (form) => {
            form.resetFields();
            dispatch(hideUpdateModal())
        },

        onUpdateAdmin : (id, form) => {
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    values.id = id;
                    dispatch(updateAdmin(values));
                    form.resetFields();
                    dispatch(hideUpdateModal())
                }
            });
        }
    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(UpdateAdmin))
