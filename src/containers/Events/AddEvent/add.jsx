import React from 'react'

import { Form, Input, InputNumber, Tooltip,
     Icon, Cascader, Select, Row, Col,
      Checkbox, Button, message, div, 
      AutoComplete, DatePicker, Divider, 
      Upload  } from 'antd';

import PanelBox from "../../../components/PanelBox";

import moment from 'moment';

import env from '../../../config/env';

import {post} from "../../../api/config/http";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import './style.css';

import _ from 'lodash';


const {RangePicker } = DatePicker;

const { TextArea } = Input;

const Dragger = Upload.Dragger;



class AddEvent extends React.Component {

    state = {
        confirmDirty: false,
        image : {},
        address : ''
    };

    componentWillMount() {
        this.props.onLoadEstablishments();
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
                this.props.onCreateEvent(this.props.form,{image : this.state.image, cords : location.latLng, city : location.city.long_name});
            })
            .catch(error => message.error('Adresse est incorrect'))
    };

    handlePublish = (e) => {
        e.preventDefault();
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
                this.props.onCreateEvent(this.props.form,{image : this.state.image, cords : location.latLng, city : location.city.long_name, publish :true});
            })
            .catch(error => message.error('Adresse est incorrect'))
                
    };

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

    createUniTypeForm = () => {

        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Divider/>
                <Form.Item
                        {...formItemLayout}
                        label="Date de debut"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('debutDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir la date de debut!'
                                    }
                                ],
                            })(<DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                //value={startValue}
                                placeholder="Start"
                                //onChange={this.onStartChange}
                                //onOpenChange={this.handleStartOpenChange}
                              />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Date de fin"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('endDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez entrer la date de fin'
                                    }
                                ],
                            })(<DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                //value={endValue}
                                placeholder="End"
                                //onChange={this.onEndChange}
                                //open={endOpen}
                                //onOpenChange={this.handleEndOpenChange}
                              />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Ville"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('ville', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir une ville!'
                                    }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Adresse"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('address', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir une adresse!'
                                    }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Type d'accés"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('eventAccess', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le type d\'accés!'
                                    }
                                ],
                                initialValue: "gratuit"
                            })(
                                <Select>
                                    <Select.Option value="gratuit">Gratuit</Select.Option>
                                    <Select.Option value="payant">Payant</Select.Option>
                                </Select>
                            )}
                    </Form.Item>
               
             </div>
        )
    };

    createMultiTypeForm = () => {

        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        var tab = [];
        for(var i =0;i<getFieldValue('nbrEvents');i++){
          tab[i] = i;
        }
        return tab.map(item => (
            <div key={item}>
                <Divider/>
                <Form.Item
                 {...formItemLayout}
                 label="Date de debut"
                 hasFeedback
             >
                 {
                     getFieldDecorator('debutDate'+item , {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez saisir la date de debut!'
                             }
                         ],
                         initialValue : this.state.startValue
                     })(<DatePicker
                         disabledDate={this.disabledStartDate}
                         showTime
                         format="YYYY-MM-DD HH:mm:ss"
                         placeholder="Debut"
                         onChange={(value) =>{
                             if(!this.state.startValue){
                                 this.setState({startValue : value})
                             }
                         }}
                         //onOpenChange={this.handleStartOpenChange}
                       />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Date de fin"
                 hasFeedback
             >
                 {
                     getFieldDecorator('endDate' + item, {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez entrer la date de fin'
                             }
                         ],
                         initialValue : this.state.endValue
                     })(<DatePicker
                         disabledDate={this.disabledEndDate}
                         showTime
                         format="YYYY-MM-DD HH:mm:ss"
                         placeholder="Fin"
                         onChange={(value) =>{
                            if(!this.state.endValue){
                                this.setState({endValue : value})
                            }
                        }}
                         //open={endOpen}
                         //onOpenChange={this.handleEndOpenChange}
                       />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Ville"
                 hasFeedback
             >
                 {
                     getFieldDecorator('ville' + item, {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez saisir une ville!'
                             }
                         ],
                     })(<Input />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Adresse"
                 hasFeedback
             >
                 {
                     getFieldDecorator('address' + item, {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez saisir une adresse!'
                             }
                         ],
                     })(<Input />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Type d'accés"
                 hasFeedback
             >
                 {
                     getFieldDecorator('eventAccess' + item, {
                         rules: [
                             {
                                 required: true,
                                 message: "Veuillez saisir le type d'accés!"
                             }
                         ],
                         initialValue: "gratuit"
                     })(
                         <Select>
                             <Select.Option value="gratuit">Gratuit</Select.Option>
                             <Select.Option value="payant">Payant</Select.Option>
                         </Select>
                     )}
             </Form.Item>
             </div>
        ))
    };

    createChapTypeForm = () => {

        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        var tab = [];
        for(var i =0;i<getFieldValue('nbrEvents');i++){
          tab[i] = i;
        }
        return tab.map(item => (
            <div key={item}>
                <Divider/>
                <Form.Item
                 {...formItemLayout}
                 label="Date de debut"
                 hasFeedback
             >
                 {
                     getFieldDecorator('debutDate', {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez saisir la date de debut!'
                             }
                         ],
                     })(<DatePicker
                         disabledDate={this.disabledStartDate}
                         showTime
                         format="YYYY-MM-DD HH:mm:ss"
                         //value={startValue}
                         placeholder="Start"
                         //onChange={this.onStartChange}
                         //onOpenChange={this.handleStartOpenChange}
                       />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Date de fin"
                 hasFeedback
             >
                 {
                     getFieldDecorator('endDate', {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez entrer la date de fin'
                             }
                         ],
                     })(<DatePicker
                         disabledDate={this.disabledEndDate}
                         showTime
                         format="YYYY-MM-DD HH:mm:ss"
                         //value={endValue}
                         placeholder="End"
                         //onChange={this.onEndChange}
                         //open={endOpen}
                         //onOpenChange={this.handleEndOpenChange}
                       />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Ville"
                 hasFeedback
             >
                 {
                     getFieldDecorator('ville', {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez saisir une ville!'
                             }
                         ],
                     })(<Input />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Adresse"
                 hasFeedback
             >
                 {
                     getFieldDecorator('address', {
                         rules: [
                             {
                                 required: true,
                                 message: 'Veuillez saisir une adresse!'
                             }
                         ],
                     })(<Input />)
                 }
             </Form.Item>
             <Form.Item
                 {...formItemLayout}
                 label="Type d'accés"
                 hasFeedback
             >
                 {
                     getFieldDecorator('eventAccess', {
                         rules: [
                             {
                                 required: true,
                                 message: "Veuillez saisir le type d'accés!"
                             }
                         ],
                         initialValue: "gratuit"
                     })(
                         <Select>
                             <Select.Option value="gratuit">Gratuit</Select.Option>
                             <Select.Option value="payant">Payant</Select.Option>
                         </Select>
                     )}
             </Form.Item>
             </div>
        ))
    };

    normalizeAll = (value, prevValue = []) => {
        console.log(value);
        if (this.props.establishments.indexOf(value)> -1) {
            return value;
        }
        else
        return '';
    };

    customRequest = ({ onSuccess, onError, file }) => {
        //console.log(file);
        const data = new FormData();
        data.append('file', file);
        data.append('name', 'some value user types');
        data.append('description', 'some value user types');
        // '/files' is your node.js route that triggers our middleware
        post('/backoffice/uploadEventImage', data).then((response) => {
            console.log(response); // do something with the response
        });
    };
    onPictureLoading = (info) => {
        console.log(info);
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
          console.log(info.file.response)
        this.setState({'image': info.file})
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);

      }
    }

    onAddressChange = (address) => {
        this.setState({ address });
    }

    render() {
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 14,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            }
        };
        const props = {
            name: 'file',
            multiple: false,
            accept : 'image/*',
            action: `${env.API_HOST}:${env.API_PORT}/backoffice/uploadEventImage`,
            //customRequest: this.customRequest,
            onChange : this.onPictureLoading ,
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
            <PanelBox title="Ajouter un événement">
                <Form onSubmit={this.handleSubmit}>
                    <div style={{ fontWeight: 700, marginBottom : 6 }}>Details de l'événement</div>
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
                            })(<Input />)
                        }
                    </Form.Item>
                    {/*
                    <Form.Item
                        {...formItemLayout}
                        label="Ville"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('city', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir une ville!'
                                    }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    */}
                    <Form.Item
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
                    </Form.Item>
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
                            })(<AutoComplete
                                dataSource={this.props.establishments}
                                style={{ width: 200 }}
                                defaultActiveFirstOption
                                placeholder="input here"
                              />)
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
                            })(
                                <RangePicker
                                  disabledDate={this.disabledDate}
                                  disabledTime={this.disabledRangeTime}
                                  showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [this.currentTime(), moment('11:30', 'HH:mm')],
                                  }}
                                  format="YYYY-MM-DD HH:mm"
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
                            })(<TextArea placeholder="Description de l'événement" 
                                    autosize={{ minRows: 2, maxRows: 6 }} 
                                />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Image de l'événement"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('image', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir une image!'
                                    }
                                ],
                                initialValue : null

                            })(<Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                  <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Cliquez ou faites glisser l'image sur cette zone pour la télécharger</p>
                                <p className="ant-upload-hint">Prise en charge d'un seul téléchargement. Interdire strictement de télécharger des données d'entreprise ou d'autres fichiers de bande</p>
                              </Dragger>)
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
                                initialValue: "gratuit"
                            })(
                                <Select>
                                    <Select.Option value="gratuit">Gratuit</Select.Option>
                                    <Select.Option value="payant">Payant</Select.Option>
                                </Select>
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
                                initialValue: "ART"
                            })(
                                <Select>
                                    <Select.Option value="ART">Art</Select.Option>
                                    <Select.Option value="CANCERT">Cancert</Select.Option>
                                    <Select.Option value="THEATRE">Theatre</Select.Option>
                                </Select>
                            )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Type de l'événement"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('type', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le type de l\'événement!'
                                    }
                                ],
                                initialValue: "UNITAIRE"
                            })(
                                <Select>
                                    <Select.Option value="UNITAIRE">Unitaire</Select.Option>
                                    <Select.Option value="MULTIPLE">Multiple</Select.Option>
                                    <Select.Option value="CHAPEAU">Chapeau</Select.Option>
                                </Select>
                            )}
                    </Form.Item>     
            {/* (getFieldValue('eventType') === 'UNITAIRE' ) &&
               
                    this.createUniTypeForm()
        
            }
                    { (getFieldValue('eventType') === 'MULTIPLE' ) &&
                (<div>
                    <Form.Item
                        {...formItemLayout}
                        label="Nombre des événements"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('nbrEvents', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le nombre des événements!'
                                    }
                                ],
                                initialValue : 2
                            })(<InputNumber min={2} max={10} />)
                        }
                    </Form.Item>
                    {
                        this.createMultiTypeForm()
                        
                    }
                    
                    </div>)
                    }
                { (getFieldValue('eventType') === 'CHAPEAU' ) &&
                    (<div>
                    <Form.Item
                            {...formItemLayout}
                            label="Nombre des événements"
                            hasFeedback
                        >
                            {
                                getFieldDecorator('nbrEvents', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Veuillez saisir le nombre des événements!'
                                        }
                                    ],
                                    initialValue : 2
                                })(<InputNumber min={2} max={10} />)
                            }
                        </Form.Item>
                        {
                            this.createChapTypeForm()
                            
                        }
                    </div>)
                    */}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">Eregistrer</Button>
                        <Button onClick={this.handlePublish} style={{ marginLeft: 8 }} size="large">Publier</Button>
                    </Form.Item>
                </Form>
            </PanelBox>
        );
    }
}



export default Form.create()(AddEvent);
