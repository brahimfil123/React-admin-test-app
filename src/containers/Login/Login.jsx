import React from 'react'
import { Form, Input, Button, Row, Col, Icon } from 'antd'

import './index.css'

class Login extends React.Component {

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row className="login-row" type="flex" justify="space-around" align="middle">
                <Col span="8">
                    <Form layout="horizontal" onSubmit={(e) => {this.props.onLogin(e, this.props.form)}} className="login-form">
                        <h2 className="logo">
                            <span>logo</span>
                        </h2>
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: `Veuillez saisir un email ou nom d'utilisateur !`
                                    }
                                ],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder='fayn' />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: `Veuillez saisir un mot de passe !`
                                    }
                                ],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type='password' placeholder='password' />
                            )}
                        </Form.Item>
                        <p>
                            <Button className="btn-login" type='primary' size="large" icon="poweroff" loading={this.props.loggingIn} htmlType='submit'>Connexion</Button>
                        </p>
                        <p>
                            <Button className="btn-register" size="large" icon="right-square-o" htmlType='button' onClick={() => {this.props.changePage('/register')}} >S'inscrire</Button>
                        </p>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default Form.create()(Login);
