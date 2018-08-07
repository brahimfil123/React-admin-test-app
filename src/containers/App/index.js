import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from '../../store'
import route from '../../route';

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter children={route} history={history}/>
            </Provider>
        )
    }
}

