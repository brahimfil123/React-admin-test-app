import React from 'react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

import AddAdmin from './add';
import {post} from "../../../api/config/http";

function mapStateToProps({}) {
    return {
   
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateAdmin : (form) => {
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    post('/backoffice/createAdmin', {...values, role: 'ADMIN'})
                        .then(res => {
                            if(res.success) {
                                form.resetFields();
                                message.success('Admin créé avec succès');
                            } else {
                                message.error(<ul>{res.messages.map(message => <li>{message}</li>)}</ul>, 5);
                            }
                        })
                        .catch(err => {
                            message.error('Erreur interne !');
                        })
                }
            });
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAdmin))