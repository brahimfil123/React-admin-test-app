import React from 'react'

import { Layout } from 'antd'

import './index.css'

const { Footer } = Layout;

export default class commonFooter extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Tous droits réservés &copy; 2018 www.fayn.co
      </Footer>
    )
  }
}
