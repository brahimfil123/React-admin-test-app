import { connect } from 'react-redux';

import App from './Layout'
import {fetchProfile, logout} from '../../actions/auth';

function mapStateToProps ({ auth, menu }) {
    return {
        auth: auth ? auth : null,
        navpath: menu.navpath
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onFetchProfile : () => {
            dispatch(fetchProfile())
        },

        onLogout : () => {
            dispatch(logout())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
