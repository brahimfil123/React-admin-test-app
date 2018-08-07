import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {getData} from "./storage";
import {TOKEN} from "./global";
import {post} from "../api/config/http";

const validate = function(history) {
  const isLoggedIn = !!getData(TOKEN);
  if (!isLoggedIn && history.location.pathname !== '/login') {
    history.replace('/login');
  } else {
      post('/backoffice/verifyToken', {})
          .then(res => {
              if(!res.success) {
                  history.location.pathname !== '/login' && history.replace('/login');
              }
          })
          .catch(err => {
              history.location.pathname !== '/login' && history.replace('/login');
          });
  }
};

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export default function authHOC(BaseComponent) {
  class Restricted extends Component {

    componentWillMount() {
      Restricted.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        Restricted.checkAuthentication(nextProps);
      }
    }

    static checkAuthentication(params) {
      const { history } = params;
      validate(history);
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return withRouter(Restricted);
}
