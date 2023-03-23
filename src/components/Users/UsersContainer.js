import {
  follow,
  unfollow,
  setCurrentPage,
  followInProgress,
  getUsersThunkCreator,
  getUnfollowThunkCreator,
  getFollowThunkCreator,
} from './../../redux/users-reducer';
import { connect } from 'react-redux';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from './../../hoc/withAuthRedirect';
import {
  getUsersSuper,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from './../../redux/users-selectors';

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    this.props.getUsersThunkCreator(
      this.props.currentPage,
      this.props.pageSize
    );
  }

  onPageChanged = (p) => {
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
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followInProgress={this.props.followInProgress}
          followingInProgress={this.props.followingInProgress}
          getUnfollowThunkCreator={this.props.getUnfollowThunkCreator}
          getFollowThunkCreator={this.props.getFollowThunkCreator}
        />
        {this.props.isFetching ? <Preloader /> : null}
      </>
    );
  }
}

let mapStateToProps = (state) => {
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
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    followInProgress,
    getUsersThunkCreator,
    getUnfollowThunkCreator,
    getFollowThunkCreator,
  })
)(UsersAPIComponent);
