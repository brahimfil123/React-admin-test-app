import React , {Component} from 'react'
import { Table, Icon, Alert, AutoComplete } from 'antd'
import _ from 'lodash'

import PanelBox from '../../../components/PanelBox';

import UpdateEvent from '../Update';

import './style.css';

import moment from 'moment';


class ListEvents extends Component {
    dataS = [];
    columns = [
        , {
            title: 'Etablissement',
            dataIndex: 'organisation.companyName',
            width: 150,
            filterDropdown : (
            <AutoComplete
                dataSource={this.props.establishments}
                style={{ width: 200 }}
                onSearch={(value) => { this.props.onLoadListEvents(this.props.pagination, { 'organisation' : value }, {})}}
                placeholder="input here"
              />
            )
        }, {
            title: 'Nom',
            dataIndex: 'name',
            sorter: true,
            width: 150
        }, {
            title: 'Access',
            dataIndex: 'access',
            filters: [
                { text: 'payant', value: 'payant' },
                { text: 'gratuit', value: 'gratuit' }            ],
            width: 150
        }, {
            title: 'Status',
            dataIndex: 'status',
            filters: [
                { text: 'publié', value: 'PUBLISHED' },
                { text: 'enregistré', value: 'SAVED' },
                { text: 'archivé', value: 'ARCHIVED' },
            ],
            width: 150
        }, {
            title: 'Categorie',
            dataIndex: 'category',
            width: 150
        }, {
            title: 'Ville',
            dataIndex: 'city.name',
            width: 150
        },
        {
            title: 'Date debut',
            dataIndex: 'startDate',
            width: 150
        },
        {
            title: 'Date fin',
            dataIndex: 'endDate',
            width: 150
        }, {
            title: 'Description',
            dataIndex: 'description',
            width: 150
        }, {
            title: 'Action',
            fixed: 'right',
            width: 200,
            render: (event) => <div>
                <a  onClick={(e) => this.props.onEditEvent(e, event)} className={'edit-user'} href="#"><Icon type="edit" style={{fontSize: 20} } /></a> 
                {
                 (event.type === 'MULTIPLE' && event.status !== 'ARCHIVED') ? <a onClick={(e) => this.props.onAddChildEvent(e, event)} className={'activate-user'} href="#"><Icon type="plus-circle-o" style={{fontSize: 20}} /></a> :''
                }
                {
                 (event.type === 'CHAPEAU' && event.status !== 'ARCHIVED') ? <a onClick={(e) => this.props.onDuplicateEvent(e, event)} className={'activate-user'} href="#"><Icon type="plus-circle-o" style={{fontSize: 20}} /></a> :''
                }
                {
                 (event.status === 'SAVED') ? <a onClick={(e) => this.props.onPublishEvent(e, event._id)} className={'activate-user'} href="#"><Icon type="check" style={{fontSize: 20}} /></a> :''
                }
                {
                 (event.status !== 'ARCHIVED') ? <a onClick={(e) => this.props.onDeleteEvent(e, event._id)} className={'delete-user'} href="#"><Icon type="delete" style={{fontSize: 20}} /></a>: ''
                }
            </div>
        }
    ];

    componentWillMount() {
        this.props.onLoadListEvents(this.props.pagination, {}, this.props.sorter);
    }

    render() {
        return (
            <PanelBox title='Liste des événement'>
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
                    rowKey={record => record._id}
                    dataSource={this.props.events}
                    pagination={this.props.pagination}
                    loading={this.props.loading}
                    onChange={this.props.onLoadListEvents}
                    scroll={{ x: 300, y: 400 }}
                />
                <UpdateEvent/>
            </PanelBox>
        )
    }
}

export default ListEvents;
