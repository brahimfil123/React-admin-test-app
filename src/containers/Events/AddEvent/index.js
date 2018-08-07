import React from 'react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';

import AddEvent from './add';
import {post} from "../../../api/config/http";
import {loadListEstablishmentsAction} from '../../../actions/establishments';

function mapStateToProps({establishments}) {
    return {   
        establishments : establishments.establishments,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLoadEstablishments : () => {
            dispatch(loadListEstablishmentsAction())
        },
        onCreateEvent : (form, moreData) => {
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if(moreData.publish) values.publish = moreData.publish;
                    values.startDate = values.date[0]._d;
                    values.endDate = values.date[1]._d;
                    values.image = moreData.image.response;
                    values.city = moreData.city;
                    values.coordinates = [moreData.cords.lat, moreData.cords.lng];
                    delete values.date;
                    delete values.address;
                    console.log(values);
                    post('/backoffice/createEvent', {...values})
                        .then(res => {
                            if(res.success) {
                                form.resetFields();
                                message.success('Evénement créé avec succès');
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEvent))