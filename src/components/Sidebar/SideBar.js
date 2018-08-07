import React from 'react';
import { matchPath } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import sideBarRoutes from '../../route/sideBar';
import './index.css';

const { Sider } = Layout;

const isActive = (path, history) => {
    return matchPath(path, {
        path: history.location.pathname,
        exact: true,
        strict: false
    })
};

export default class Sidebar extends React.Component {

    state = {
        openKey: "sub1",
        activeKey: "menu101",
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: !this.state.collapsed ? 'vertical' : 'inline',
        });
    };

    componentWillReceiveProps() {
        Array.isArray(sideBarRoutes.menus) && sideBarRoutes.menus.map((item) => {
            Array.isArray(item.child) && item.child.map((node) => {
                if(node.url && isActive(node.url, this.props.history)){
                    this.menuClickHandle({
                        key: 'menu'+node.key,
                        keyPath: ['menu' + node.key, 'sub' + item.key]
                    })
                }
            })
        });
    }

    menuClickHandle = (item) => {
        this.setState({
            activeKey: item.key
        })
    };

    render () {
        const { history } = this.props;
        let { activeKey, openKey } = this.state;

        const _menuProcess = (nodes, pkey) => {
            return Array.isArray(nodes) && nodes.map((item, i) => {
                const menu = _menuProcess(item.child, item.key);
                if(item.url && isActive(item.url, history)){
                    activeKey = 'menu'+item.key;
                    openKey = 'sub'+pkey
                }
                if (menu.length > 0) {
                    return (
                        <Menu.SubMenu
                            key={'sub'+item.key}
                            title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}
                        >
                            {menu}
                        </Menu.SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={'menu'+item.key} title={item.name}>
                            {
                                item.url ? <Link to={item.url}>{item.icon && <Icon type={item.icon} />}<span className="nav-text">{item.name}</span></Link> : <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>
                            }
                        </Menu.Item>
                    )
                }
            });
        };

        const menu = _menuProcess(sideBarRoutes.menus);

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="ant-layout-logo"/>
                <Menu
                    mode={this.state.mode} theme="dark"
                    selectedKeys={[activeKey]}
                    defaultOpenKeys={[openKey]}
                    onClick={this.menuClickHandle}
                >
                    {menu}
                </Menu>
                <div className="sider-trigger">
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </div>
            </Sider>
        )
    }
}
