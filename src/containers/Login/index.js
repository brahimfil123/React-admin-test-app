import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/auth'
import { replace } from 'react-router-redux'

import Login from './Login'

function mapStateToProps({auth}) {
    return {
        user: null,
        loggingIn: auth.loggingIn,
        loginErrors: auth.loginErrors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: (e, form) => {
            e.preventDefault();
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch(login(values))
                }
            });

        },

        changePage: (path) => {
            dispatch(replace(path))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
