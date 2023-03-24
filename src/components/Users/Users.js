import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import classes from './Users.module.css';

let Users = (props) => {
  return (
    <div>
      <Paginator
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        portionSize={10}
      />
      {props.users.map((user) => (
        <User
          key={user.id}
          id={user.id}
          name={user.name}
          status={user.status}
          followed={
            user.followed ? (
              <button
                disabled={props.followingInProgress.some(
                  (id) => id === user.id
                )}
                className={classes.btn}
                onClick={() => {
                  props.getUnfollowThunkCreator(user.id);
                }}
              >
                unfollow
              </button>
            ) : (
              <button
                disabled={props.followingInProgress.some(
                  (id) => id === user.id
                )}
                className={classes.btn}
                onClick={() => {
                  props.getFollowThunkCreator(user.id);
                }}
              >
                follow
              </button>
            )
          }
        ></User>
      ))}
    </div>
  );
};

export default Users;
