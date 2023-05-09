import classes from './Profile.module.css';
import PostsContainer from './Posts/PostsContainer';
import Page from './Page/Page';
import React from "react";
import {profileType} from "../../redux/profile-reducer";
import {profileInfoFormValuesType} from "./Page/ProfileInfoForm";

type propsType = {
    profile: profileType | null
    status: string
    isOwner: boolean

    updateUserStatus: (status: string) => void
    savePhoto: (file: any) => void
    setProfile: (formData: profileInfoFormValuesType) => void
}

const Profile: React.FC<propsType> = (props) => {
  return (
    <div className={classes.profile}>
      <img
        src="https://kartinkin.net/pics/uploads/posts/2022-08/1660786584_6-kartinkin-net-p-tragichnii-fon-krasivo-7.jpg"
        className={classes.back_img}
        alt="img"
      />
      <Page
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        setProfile={props.setProfile}
      />
      <PostsContainer />
    </div>
  );
};

export default Profile;
