import Profile from './Profile';
import React from 'react';
import {
  getProfileData,
  getUserStatus,
  updateUserStatus,
  savePhoto, setProfile
} from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import { compose } from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

  refreshProfile(){
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.userId
    }
    this.props.getProfileData(userId);
    this.props.getUserStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.router.params.userId !== prevProps.router.params.userId)
      this.refreshProfile()
  }

  render() {
    return (
      <Profile
        isOwner = {!this.props.router.params.userId}
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhoto}
        setProfile={this.props.setProfile}
      />
    );
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId
  };
};

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{location, navigate, params}}/>;
  }

  return ComponentWithRouterProp;
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
      getProfileData,
      getUserStatus,
      updateUserStatus,
      savePhoto,
      setProfile
    }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);
