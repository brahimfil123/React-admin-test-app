import React , {Component} from 'react'
import { Table, Icon, Alert } from 'antd'
import _ from 'lodash'

import PanelBox from '../../../components/PanelBox';
import UpdateAdmin from '../Update'
import './style.css'

class ListAdmins extends Component {
    columns = [
        {
            title: 'Nom',
            dataIndex: 'lastName',
            sorter: true,
            width: '15%'
        }, {
            title: 'Prenom',
            dataIndex: 'firstName',
            width: '15%'
        }, {
            title: 'E-mail',
            dataIndex: 'email',
        }, {
            title: 'Statut',
            dataIndex: 'status',
            filters: [
                { text: 'Actif', value: 'ACTIVE' },
                { text: 'Suspendu', value: 'SUSPENDED' },
            ],
            width: '20%'
        }, {
            title: 'Action',
            dataIndex: '',
            render: (admin) => <div>
                {/*<a onClick={(event) => this.props.onDeleteUser(event, admin)} className={'delete-user'} href="#"><Icon type="user-delete" /></a>*/}
                <a onClick={(event) => this.props.onEditUser(event, admin)} className={'edit-user'} href="#"><Icon type="edit" style={{fontSize: 20}} /></a>
            </div>
        }
    ];

    componentWillMount() {
        this.props.onLoadListAdmins(this.props.pagination, {}, this.props.sorter);
    }

    render() {
        return (
            <PanelBox title='Liste des Admins'>
                {
                    this.props.errors &&
                    <Alert
                        message="Error"
                        description={
                            <ul>
                                {_.map(this.props.errors, error => <li>{error}</li>)}
                            </ul>
                        }
                        type="error"
                        closable
                        showIcon
                        style={{marginBottom: 20}}
                        onClose={this.props.onCloseAlert}
                    />
                }
                <Table
                    columns={this.columns}
                    rowKey={record => record.registered}
                    dataSource={this.props.admins}
                    pagination={this.props.pagination}
                    loading={this.props.loading}
                    onChange={this.props.onLoadListAdmins}
                />
                <UpdateAdmin/>
            </PanelBox>
        )
    }
}

export default ListAdmins;
