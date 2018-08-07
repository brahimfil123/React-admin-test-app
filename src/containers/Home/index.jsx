import React from 'react'
import { Table, Alert } from 'antd';

import PanelBox from '../../components/PanelBox/index';

import './index.css'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  }, {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  }, {
    title: 'Address',
    dataIndex: 'address',
  }
];

const tableData = [];
for (let i = 0; i < 100; i++) {
  tableData.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default class Home extends React.Component {
  constructor () {
    super()
  }

  componentWillMount () {
  }

  callback() {

  }

  render () {

    return (
      <div>
        <div style={{'marginBottom': '20px'}}>
          <Alert
            message="Copie d'invite de message 1"
            description="Textes auxiliaires pour la présentation des messages Textes auxiliaires pour la présentation des messages Textes auxiliaires pour l'introduction des messages"
            type="info"
            showIcon
          />
        </div>

        <PanelBox title="Données récentes">
          <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        </PanelBox>
      </div>
    )
  }
}
