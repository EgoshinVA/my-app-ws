import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from '../../redux/auth-reducer';
import {appStateType} from "../../redux/redux-store";

type mapStatePropsType = {
  isAuth: boolean
  login: string | null
}

type mapDispatchPropsType = {
  logout: () => void
}

type ownPropsType = {}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

class HeaderContainer extends React.Component<propsType> {
  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  };
};
export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, { logout })(HeaderContainer);
