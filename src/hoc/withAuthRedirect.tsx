import React from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {appStateType} from "../redux/redux-store";

type mapStatePropsType = {
  isAuth: boolean
}

let mapStateToPropsForRedirect = (state: appStateType): mapStatePropsType => ({ isAuth: state.auth.isAuth });

export function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>) {

  function RedirectComponent(props: WCP & mapStatePropsType) {
    let {isAuth, ...restProps} = props
    if (!props.isAuth) return <Navigate to="/login/"/>;
    return <Component {...restProps as WCP} />;
  }

  let ConnectAuthRedirectComponent = connect<mapStatePropsType, {}, WCP, appStateType>(mapStateToPropsForRedirect)(
    RedirectComponent
  );
  return ConnectAuthRedirectComponent;
};
