import Profile from './Profile';
import React from 'react';
import {
  getProfileThunkCreator,
  getUserStatus,
  updateUserStatus,
} from './../../redux/profile-reducer';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.profileId;

    this.props.getProfileThunkCreator(profileId);
    this.props.getUserStatus(profileId);
  }
  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
  };
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default compose(
  connect(mapStateToProps, {
    getProfileThunkCreator,
    getUserStatus,
    updateUserStatus,
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
