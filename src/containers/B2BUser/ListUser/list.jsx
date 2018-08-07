import React , {Component} from 'react'
import { Table, Icon, Alert, AutoComplete } from 'antd'
import _ from 'lodash'

import PanelBox from '../../../components/PanelBox';
import UpdateUser from '../Update'
import './style.css'

class ListUsers extends Component {
    dataS = [];
    columns = [
        , {
            title: 'Etablissement',
            dataIndex: 'companyName',
            width: 150,
            filterDropdown : (
            <AutoComplete
                dataSource={this.props.establishments}
                style={{ width: 200 }}
                onSearch={(value) => { this.props.onLoadListUsers(this.props.pagination, { 'companyName' : value }, {})}}
                placeholder="input here"
              />
            )
        }, {
            title: 'Nom',
            dataIndex: 'lastName',
            sorter: true,
            width: 150
        }, {
            title: 'Prenom',
            dataIndex: 'firstName',
            width: 150
        }, {
            title: 'Rôle',
            dataIndex: 'role',
            filters: [
                { text: 'Admin', value: 'ADMIN' },
                { text: 'utilisateur', value: 'USER' },
            ],
            width: 150
        }, {
            title: 'Statut',
            dataIndex: 'status',
            filters: [
                { text: 'Actif', value: 'ACTIVE' },
                { text: 'Suspendu', value: 'SUSPENDED' },
                { text: 'Archive', value: 'ARCHIVE' },
            ],
            width: 150
        }, {
            title: 'E-mail',
            dataIndex: 'email',
            width: 150
        }, {
            title: 'Téléphone',
            dataIndex: 'mobile',
            width: 150
        }, {
            title: 'Fix',
            dataIndex: 'phone',
            width: 150
        }, {
            title: 'Action',
            fixed: 'right',
            width: 150,
            render: (user) => <div>
                <a  onClick={(event) => this.props.onEditUser(event, user)} className={'edit-user'} href="#"><Icon type="edit" style={{fontSize: 20} } /></a> 
                { (user.status === 'SUSPENDED') ? <a onClick={(event) => this.props.onActivateUser(event, user._id)} className={'activate-user'} href="#"><Icon type="unlock" style={{fontSize: 20}} /></a> :''}
                { (user.status !== 'ARCHIVE') ? <a onClick={(event) => this.props.onDeleteUser(event, user._id)} className={'delete-user'} href="#"><Icon type="user-delete" style={{fontSize: 20}} /></a> :''} 
            </div>
        }
    ];

    componentWillMount() {
        this.props.onLoadListUsers(this.props.pagination, {}, this.props.sorter);
    }

    render() {
        return (
            <PanelBox title='Liste des Utilisateurs'>
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
                    dataSource={this.props.users}
                    pagination={this.props.pagination}
                    loading={this.props.loading}
                    onChange={this.props.onLoadListUsers}
                    scroll={{ x: 300, y: 400 }}
                />
                <UpdateUser/>
            </PanelBox>
        )
    }
}

export default ListUsers;
