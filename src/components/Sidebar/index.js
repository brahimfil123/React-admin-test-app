import React from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Sidebar from './SideBar'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // TODO
    // updateNavPath: bindActionCreators(updateNavPath, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
