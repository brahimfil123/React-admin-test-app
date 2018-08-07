import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Modal, Form } from 'antd';

import {
    hideUpdateModal, loadListUsersAction, setErrorsMessage, showUpdateModal,
    updatePagination, activateUser, deleteUser
} from '../../../actions/users'
import List from './list';

function mapStateToProps({users}) {
    return {
        loading : users.isFetching,
        users : users.users,
        pagination : users.pagination,
        updateUserData : users.updateUser.data,
        showModal : users.updateUser.showModel,
        errors: users.errors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadListUsers : (pagination, filters, sorter) => {
            let sort = {};
            if(!_.isEmpty(sorter)) {
                sort = {
                    field: sorter.field,
                    order: sorter.order
                };
            }
            console.log({...filters, ...sort})
            dispatch(updatePagination(pagination));
            dispatch(loadListUsersAction({...filters, ...sort}))
        },

        onEditUser : (event, user) => {
            event.preventDefault();
            dispatch(showUpdateModal(user))
        },

        onActivateUser : (event, userId) => {
            event.preventDefault();
            Modal.confirm({
                title: 'Êtes-vous sûr d\'activer cet utilisateur ?',
                okText: 'Activer',
                okType: 'primary',
                cancelText: 'Annuler',
                onOk() {
                    dispatch(activateUser(userId))
                    console.log('activation user => ' + userId);
                }
            });
        },

        onDeleteUser : (event, userId) => {
            event.preventDefault();
            Modal.confirm({
                title: 'Êtes-vous sûr de désactiver cet utilisateur ?',
                okText: 'Désactiver',
                okType: 'danger',
                cancelText: 'Annuler',
                onOk() {
                    dispatch(deleteUser(userId))
                    console.log('archived admin is => ' + userId);
                }
            });
        },

        onHideModal : () => {
            dispatch(hideUpdateModal())
        },

        onCloseAlert : () => {
            dispatch(setErrorsMessage(null))
        }
    }
}

export default Form.create()(withRouter(connect(mapStateToProps, mapDispatchToProps)(List)))
