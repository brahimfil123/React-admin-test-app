import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Modal, Form } from 'antd';

import {
    hideUpdateModal, loadListEventsAction, setErrorsMessage, showUpdateModal,
    updatePagination, publishEvent, deleteEvent
} from '../../../actions/events'
import List from './list';

function mapStateToProps({events}) {
    return {
        loading : events.isFetching,
        events : events.events,
        pagination : events.pagination,
        updateEventData : events.updateEvent.data,
        showModal : events.updateEvent.showModel,
        errors: events.errors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadListEvents : (pagination, filters, sorter) => {
            let sort = {};
            if(!_.isEmpty(sorter)) {
                sort = {
                    field: sorter.field,
                    order: sorter.order
                };
            }
            console.log({...filters, ...sort})
            dispatch(updatePagination(pagination));
            dispatch(loadListEventsAction({...filters, ...sort}))
        },

        onEditEvent : (e, event) => {
            e.preventDefault();
            dispatch(showUpdateModal(event))
        },

        onDuplicateEvent : (e, event) => {
            e.preventDefault();
            event.childUpdate = true;
            event.clone = true;
            dispatch(showUpdateModal(event))
        },

        onAddChildEvent : (e, event) => {
            e.preventDefault();
            event.childUpdate = true;
            dispatch(showUpdateModal(event))
        },

        onPublishEvent : (event, eventId) => {
            event.preventDefault();
            Modal.confirm({
                title: 'Êtes-vous sûr de publier cet événement ?',
                okText: 'Activer',
                okType: 'primary',
                cancelText: 'Annuler',
                onOk() {
                    dispatch(publishEvent(eventId))
                    console.log('publishing event => ' + eventId);
                }
            });
        },

        onDeleteEvent : (event, eventId) => {
            event.preventDefault();
            Modal.confirm({
                title: 'Êtes-vous sûr de supprimer cet événement ?',
                okText: 'Désactiver',
                okType: 'danger',
                cancelText: 'Annuler',
                onOk() {
                    dispatch(deleteEvent(eventId))
                    console.log('supprimer événement is => ' + eventId);
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
