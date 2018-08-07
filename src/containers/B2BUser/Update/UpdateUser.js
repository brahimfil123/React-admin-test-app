import React, {Component} from 'react';
import { Form, Modal, Input, Select } from 'antd';

export default class UpdateUser extends Component {
    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        
        return (
            <Modal
                title="Modifier l'utilisateur"
                visible={this.props.showModal}
                onOk={() => {this.props.onUpdateUser(this.props.updateUserData._id, this.props.form)}}
                onCancel={() => {this.props.onHideModal(this.props.form)}}
            >
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="First name"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('firstName', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le prénom!'
                                    }
                                ],
                                initialValue: this.props.updateUserData.firstName
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Last name"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('lastName', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le nom!'
                                    }
                                ],
                                initialValue: this.props.updateUserData.lastName
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="E-mail"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: `L'entrée n'est pas un email valide !`
                                    },
                                    {
                                        required: true, message: `Veuillez saisir l'e-mail!`,
                                    }
                                ],
                                initialValue: this.props.updateUserData.email
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Username"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: `Veuillez entrer le nom d'utilisateur!`,
                                    }
                                ],
                                initialValue: this.props.updateUserData.userName
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Password"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('password', {})(<Input type="password" />)
                        }
                    </Form.Item>
                    { this.props.updateUserData.status === 'ARCHIVE' ?
                    (<Form.Item
                    {...formItemLayout}
                    label="Statut"
                    hasFeedback
                >
                    {
                        getFieldDecorator('status', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select account status!'
                                }
                            ],
                            initialValue: 'ACTIVE'
                        })(
                            <Input disabled/>
                        )}
                </Form.Item>)
                : ''}
                </Form>
            </Modal>
        )
    }
}
