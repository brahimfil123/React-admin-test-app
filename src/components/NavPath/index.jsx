import React from 'react'
import { Breadcrumb } from 'antd'
import _ from 'lodash'

import './index.css'

class NavPath extends React.Component {
  render () {
    // TODO : store it on state
    // ie: Home / Users / Create ...
    const bread = _.map(this.props.data, (item) => <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>);

    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key='bc-0'>Accueil</Breadcrumb.Item>
        {bread}
      </Breadcrumb>
    )
  }
}

export default NavPath
