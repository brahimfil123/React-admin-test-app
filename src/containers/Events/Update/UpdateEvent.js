import React, {Component} from 'react';
import { Form, Modal, Input, Select, DatePicker, message, Checkbox } from 'antd';

import moment from 'moment';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import './style.css';

import _ from 'lodash';

const {RangePicker } = DatePicker;

const { TextArea } = Input;

export default class updateEvent extends Component {

    state = {
        address : '',
        newAddress : false
    };

    defaultTime () {
        return (
            [
                moment(this.props.updateEventData.startDate, "YYYY-MM-DD HH:mm"), 
                moment(this.props.updateEventData.endDate, "YYYY-MM-DD HH:mm")
            ]
        )
    }

    onAddressChange = (address) => {
        this.setState({ address });
    }

    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    };
      
    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    };
            
    disabledRangeTime = (_, type) => {
        console.log(moment().hours());
        if (type === 'start') {
          return {
            disabledHours: () => [] /*this.range(0, 60).splice(0, moment().hours()+ 2)*/,
            disabledMinutes: () => this.range(0, 60).filter(min => (min !== 30 && min !== 0)),
            disabledSeconds: () => [] /*this.range(0, 60)*/,
          };
        }
        return {
          disabledHours: () => [] /*this.range(0, 60)*/,
          disabledMinutes: () => this.range(0, 60).filter(min => (min !== 30 && min !== 0)),
          disabledSeconds: () => [] /*this.range(0, 60)*/,
        };
    };
    currentTime = () => {
        return moment().add(2, 'hours').format('HH:mm');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.newAddress){
            geocodeByAddress(this.state.address)
                .then(results => {
                    var city = _.find(results[0].address_components, (e) => (e.types[0] === 'locality') )
                    return getLatLng(results[0]).then((latLng)=>{
                        return ({
                            latLng, 
                            city
                        })
                    });
                })
                .then(location => {
                    //console.log(location);
                    this.setState({newAddress : false});
                    this.props.onUpdateEvent(this.props.updateEventData._id, this.props.form, {cords : location.latLng, city : location.city.long_name})
                })
                .catch(error => message.error('Adresse est incorrect'));
            } else
            this.props.onUpdateEvent(this.props.updateEventData._id, this.props.form, {cords : this.props.updateEventData.coordinates, city : this.props.updateEventData.city.name})
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const inputProps = {
            value: this.state.address,
            onChange: this.onAddressChange,
            type: 'search'
        }
        
        const options = {
            componentRestrictions: {country: "ma"}
        };
        
        return (
            <Modal
                title="Modifier l'événement"
                visible={this.props.showModal}
                onOk={this.handleSubmit}
                onCancel={() => {this.props.onHideModal(this.props.form)}}
            >
             <div style={{ fontWeight: 700, marginBottom : 6 }}>Details</div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="nom de l'événement"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le nom de l\'événement!'
                                    }
                                ],
                                initialValue : this.props.updateEventData.name
                            })(<Input disabled={this.props.updateEventData.clone} />)
                        }
                    </Form.Item>
                    <Checkbox checked={this.state.newAddress} onChange={(e)=>{ this.setState({newAddress : e.target.checked})}}>Changer l'adresse</Checkbox>
                    <br/><br/>
                    { this.state.newAddress && 
                    (<Form.Item
                        {...formItemLayout}
                        label="Adresse"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('address', {
                                /*rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir une adresse!'
                                    }
                                ],*/
                            })(<PlacesAutocomplete inputProps={inputProps} options={options} />)
                        }
                    </Form.Item>)
                    }
                {   this.props.updateEventData.childUpdate && (
                    <Form.Item
                        {...formItemLayout}
                        label="Parent"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('parent', {
                                rules: [
                                    {
                                        required: true
                                    }
                                ],
                                initialValue : this.props.updateEventData.name
                            })(<Input disabled/>)
                        }
                    </Form.Item>)
                }
                    <Form.Item
                        {...formItemLayout}
                        label="Etablissement"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('organisation', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le nom de l\'établissement!'
                                    }
                                ],
                                initialValue : this.props.updateEventData.organisation?this.props.updateEventData.organisation.companyName:this.props.updateEventData.organisation
                            })(<Input disabled/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Date de l'événement"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('date', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir la date de debut!'
                                    }
                                ],
                                initialValue : this.defaultTime()
                                /*initialValue : [this.props.updateEventData.startDate, this.props.updateEventData.endDate]*/
                            })(
                                <RangePicker
                                    /*disabledDate={this.disabledDate}
                                    disabledTime={this.disabledRangeTime}*/
                                    showTime={{
                                        hideDisabledOptions: true
                                    }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                              )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Description"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir une description!'
                                    }
                                ],
                                initialValue : this.props.updateEventData.description
                            })(<TextArea disabled={this.props.updateEventData.clone} placeholder="Description de l'événement" 
                                    autosize={{ minRows: 2, maxRows: 6 }} 
                                />)
                        }
                    </Form.Item>
                    <div style={{ fontWeight: 700, marginBottom : 6 }}>Paramètres supplémentaires</div>
                    
                    <Form.Item
                        {...formItemLayout}
                        label="Type d'accés"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('access', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le type d\'accés!'
                                    }
                                ],
                                initialValue: this.props.updateEventData.access
                            })( this.props.updateEventData.clone?<Input disabled/>:(
                                <Select>
                                    <Select.Option value="gratuit">Gratuit</Select.Option>
                                    <Select.Option value="payant">Payant</Select.Option>
                                </Select>)
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label= "Categorie de l'événement"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('category', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir la categorie de l\'événement!'
                                    }
                                ],
                                initialValue: this.props.updateEventData.category
                            })(this.props.updateEventData.clone?<Input disabled/>:(
                                <Select>
                                    <Select.Option value="ART">Art</Select.Option>
                                    <Select.Option value="CANCERT">Cancert</Select.Option>
                                    <Select.Option value="THEATRE">Theatre</Select.Option>
                                </Select>)
                            )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
