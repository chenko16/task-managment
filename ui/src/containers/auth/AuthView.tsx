import * as React from 'react';

import AuthForm, {AuthFormDispatchProps} from '../../components/auth/AuthForm'

import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as authActions from '../../store/auth/Actions'
import {ApplicationState} from '../../store/Store';
import {withRouter} from 'react-router';
import {RouteProps} from 'react-router-dom';


export interface AuthViewDispatchProps extends AuthFormDispatchProps{
}

class AuthView extends React.Component<AuthFormDispatchProps & RouteProps,any> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <AuthForm
        onSignInClicked={(username, password) => {
          this.props.onSignInClicked(username,password, () => {
            this.props.history.push('/tasks')
          })
        }}
      />
    );
  }
}

function mapStateToProps(state: ApplicationState)  {
    return {
    }
}

function mapDispatchToProps(dispatch: any): AuthViewDispatchProps {
  return {
    onSignInClicked : (username: string, password: string, callback) => {
      dispatch(authActions.authorize(username,password, callback))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthView));
