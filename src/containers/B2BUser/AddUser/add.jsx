import React from 'react'

import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, message } from 'antd';

import PanelBox from "../../../components/PanelBox";

class AddUser extends React.Component {

    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
                this.props.onCreateUser(this.props.form);
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
    validatePhoneNumber = (rule, value, callback) => {
        /*
        Phone number validation using google-libphonenumber
        */
        let valid = false;
        var phoneno = /^\d{10}$/;
        var phoneno1 = /^\?([0-9]{2})\)?[-. ]?([0-9]{8})$/;
        var phoneno2 = /^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{4})$/;
        var phoneno3 = /^\+?([0-9]{3})\)?[-. ]?([0-9]{9})$/;
        console.log(value)
        valid = phoneno.test(value) || phoneno1.test(value) || phoneno2.test(value) || phoneno3.test(value) 
        console.log(valid)
        if(valid) {
            callback();
        } else {
            callback("le numero que vous avez entré est incorrect");
        }
      }

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
            <PanelBox title="Ajouter un utilisateur">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="Company name"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('companyName', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le nom de l\'etablissement!'
                                    }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
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
                        label="Address"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('address', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir l\'adresse!'
                                    }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Country"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('country', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le pays!'
                                    }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="City"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('city', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir la ville!'
                                    }
                                ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Phone Number"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le numero du fix!'
                                    },
                                    {
                                        validator: this.validatePhoneNumber
                                    }
                                ],
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Mobile Number"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('mobile', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Veuillez saisir le numero de telephone!'
                                    },
                                    {
                                        validator: this.validatePhoneNumber,
                                    }
                                ],
                            })(<Input/>)
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
                                initialValue: "SUSPENDED"
                            })(
                                <Select>
                                    <Select.Option value="ACTIVE">Actif</Select.Option>
                                    <Select.Option value="SUSPENDED">Suspendu</Select.Option>
                                </Select>
                            )}
                    </Form.Item>
                    {<Form.Item
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
                                initialValue: "ADMIN"
                            })(
                                <Select>
                                    <Select.Option value="ADMIN">Admin</Select.Option>
                                    <Select.Option value="USER">Utilisateur</Select.Option>
                                </Select>
                            )}
                    </Form.Item>}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">Eregistrer</Button>
                    </Form.Item>
                </Form>
            </PanelBox>
        );
    }
}

export default Form.create()(AddUser);
