import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Modal, Form } from 'antd';

import {
    hideUpdateModal, loadListAdminsAction, setErrorsMessage, showUpdateModal,
    updatePagination
} from '../../../actions/admins'
import List from './list';

function mapStateToProps({admin}) {
    return {
        loading : admin.isFetching,
        admins : admin.admins,
        pagination : admin.pagination,
        updateAdminData : admin.updateAdmin.data,
        showModal : admin.updateAdmin.showModel,
        errors: admin.errors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadListAdmins : (pagination, filters, sorter) => {
            let sort = {};
            if(!_.isEmpty(sorter)) {
                sort = {
                    field: sorter.field,
                    order: sorter.order
                };
            }
            dispatch(updatePagination(pagination));
            dispatch(loadListAdminsAction({...filters, ...sort}))
        },

        onEditUser : (event, admin) => {
            event.preventDefault();
            dispatch(showUpdateModal(admin))
        },

        /*onDeleteUser : (event, admin) => {
            event.preventDefault();
            Modal.confirm({
                title: 'Êtes-vous sûr de désactiver cet Admin ?',
                okText: 'Désactiver',
                okType: 'danger',
                cancelText: 'Annuler',
                onOk() {
                    console.log('archiver admin is => ' + admin);
                }
            });
        },*/

        onHideModal : () => {
            dispatch(hideUpdateModal())
        },

        onCloseAlert : () => {
            dispatch(setErrorsMessage(null))
        }
    }
}

export default Form.create()(withRouter(connect(mapStateToProps, mapDispatchToProps)(List)))
