import React from 'react'
import { Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover } from 'antd'
import { Link, withRouter } from 'react-router-dom'

import './index.css'

const { Header } = Layout;

class commonHeader extends React.Component {

    render () {
        const {profile} = this.props;
        let username = profile.user ? profile.user.name : '';
        const menu = (
            <Menu style={{position: 'fixed'}}>
                <Menu.Item>
                    Option 1
                </Menu.Item>
                <Menu.Item>
                    Option 2
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.props.logout}>Se déconnecter</a>
                </Menu.Item>
            </Menu>
        );

        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
            </div>
        );

        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Row type="flex" justify="end" align="middle">
                    {/*<Col span={3}>
                        <Badge className="header-icon" count={5}>
                            <Link to="/mailbox">
                                <Icon type="mail" />
                            </Link>
                        </Badge>
                        <Popover content={content} title="Title" trigger="click">
                            <Badge className="header-icon" dot>
                                <a href="#">
                                    <Icon type="notification" />
                                </a>
                            </Badge>
                        </Popover>
                    </Col>*/}
                    <Col span={3}>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                <Avatar style={{ verticalAlign: 'middle'}}>{username}</Avatar> <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default withRouter(commonHeader)
