import * as React from 'react';

import AuthForm, {AuthFormDispatchProps} from "../../components/auth/AuthForm"

import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import * as authActions from '../../store/auth/Actions'
import {ApplicationState} from "../../store/Store";


export interface AuthViewDispatchProps extends AuthFormDispatchProps{
}

class AuthView extends React.Component<AuthFormDispatchProps,any> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <AuthForm
        onSignInClicked={this.props.onSignInClicked}
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
    onSignInClicked : (username: string, password: string) => {
      dispatch(authActions.authorize(username,password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
