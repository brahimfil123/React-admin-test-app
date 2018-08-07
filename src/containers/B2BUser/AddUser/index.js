import React from 'react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

import AddUser from './add';
import {post} from "../../../api/config/http";

function mapStateToProps(state) {
    return {
   
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateUser : (form) => {
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    post('/backoffice/createUserB2B', {...values})
                        .then(res => {
                            if(res.success) {
                                form.resetFields();
                                message.success('User créé avec succès');
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddUser))