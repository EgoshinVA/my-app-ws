import {
    usersActions,
    getUsersThunkCreator,
    getUnfollowThunkCreator,
    getFollowThunkCreator, usersType,
} from '../../redux/users-reducer';
import { connect } from 'react-redux';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
  getUsersSuper,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../redux/users-selectors';
import {appStateType} from "../../redux/redux-store";

type mapStatePropsType = {
    isFetching: boolean
    currentPage: number
    pageSize: number
    totalUsersCount: number
    users: Array<usersType>
    followingInProgress: Array<number>
}

type mapDispatchPropsType = {
    getUnfollowThunkCreator: (userNumber: number) => void
    getFollowThunkCreator: (userNumber: number) => void
    setCurrentPage: (number: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}

type ownPropsType = {}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType

class UsersContainer extends React.Component<propsType> {
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
  }

  onPageChanged = (p: number) => {
    this.props.setCurrentPage(p);
    this.props.getUsersThunkCreator(p, this.props.pageSize);
  };

  render() {
    return (
      <>
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          followingInProgress={this.props.followingInProgress}
          getUnfollowThunkCreator={this.props.getUnfollowThunkCreator}
          getFollowThunkCreator={this.props.getFollowThunkCreator}
        />
        {this.props.isFetching ? <Preloader /> : null}
      </>
    );
  }
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
  return {
    users: getUsersSuper(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  withAuthRedirect,
  connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, {
    setCurrentPage: usersActions.setCurrentPage,
    getUsersThunkCreator,
    getUnfollowThunkCreator,
    getFollowThunkCreator,
  })
)(UsersContainer);
