import React from 'react'

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, message } from 'antd';
import PanelBox from "../../../components/PanelBox";

class AddAdmin extends React.Component {

    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreateAdmin(this.props.form);
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Deux mots de passe que vous entrez sont incohérent !');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
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

        return (
            <PanelBox title="Ajouter un Administrateur">
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
                            })(<Input />)
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
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Password"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez entrer le mot de passe'
                                    },
                                    {
                                        validator: this.checkConfirm,
                                    }
                                ],
                            })(<Input type="password" />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Confirm Password"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: `Veuillez confirmer le mot de passe !`
                                    },
                                    {
                                        validator: this.checkPassword,
                                    }
                                ],
                            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item
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
                                initialValue: "ACTIVE"
                            })(
                                <Select>
                                    <Select.Option value="ACTIVE">Actif</Select.Option>
                                    <Select.Option value="SUSPENDED">Suspendu</Select.Option>
                                </Select>
                            )}
                    </Form.Item>
                    {/*<Form.Item
                        {...formItemLayout}
                        label="Rôle"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('role', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select role of the admin!'
                                    }
                                ],
                            })(
                                <Select defaultValue="ADMIN">
                                    <Select.Option value="ADMIN">Admin</Select.Option>
                                    <Select.Option value="ROOT">Root</Select.Option>
                                </Select>
                            )}
                    </Form.Item>*/}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">Eregistrer</Button>
                    </Form.Item>
                </Form>
            </PanelBox>
        );
    }
}

export default Form.create()(AddAdmin);
