import React from 'react';
import PropTypes from 'prop-types'
import { Layout } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

import { childRoutes } from '../../route/index'
import authHOC from '../../utils/auth'

import NavPath from '../../components/NavPath/index'
import Header from '../../components/Header/index'
import Sidebar from '../../components/Sidebar/index'
import Footer from '../../components/Footer/index'

import './index.css';

export default class App extends React.Component {
    componentWillMount() {
        this.props.onFetchProfile();
    }

    render() {
        const {auth, navpath} = this.props;

        return (
            auth.user && <Layout className="ant-layout-has-sider">
                <Sidebar user={auth.user}/>
                <Layout>
                    <Header profile={auth} logout={this.props.onLogout} />
                    <Layout.Content style={{ margin: '0 16px' }}>
                        <NavPath data={navpath} />
                        <div style={{ minHeight: 360 }}>
                            {
                                _.map(childRoutes, (route, index) => {
                                    if (route.root) {
                                        if (auth.user.role === 'ROOT')
                                            return <Route key={index} path={route.path} component={authHOC(route.component)} exactly={route.exactly} />
                                    } else {
                                        return <Route key={index} path={route.path} component={authHOC(route.component)} exactly={route.exactly} />
                                    }
                                })
                            }
                        </div>
                    </Layout.Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

App.propTypes = {
    auth: PropTypes.object,
    navpath: PropTypes.array
};
