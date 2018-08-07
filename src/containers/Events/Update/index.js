import { connect } from 'react-redux';
import UpdateEvent from './UpdateEvent';
import { Form } from 'antd';

import { hideUpdateModal, updateEvent } from "../../../actions/events";

function mapStateToProps({events}) {
    return {
        updateEventData : events.updateEvent.data,
        showModal : events.updateEvent.showModel
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onHideModal : (form) => {
            form.resetFields();
            dispatch(hideUpdateModal())
        },

        onUpdateEvent : (id, form, moreData) => {
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log(moreData)
                    values.id = id;
                    values.startDate = values.date[0]._d;
                    values.endDate = values.date[1]._d;
                    values.city = moreData.city;
                    values.coordinates = [moreData.cords.lat || moreData.cords[0], moreData.cords.lng || moreData.cords[1]];
                    delete values.date;
                    delete values.address;
                    dispatch(updateEvent(values));
                    form.resetFields();
                    dispatch(hideUpdateModal())
                }
            });
        }
    }
}

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(UpdateEvent))
